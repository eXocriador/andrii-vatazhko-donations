import { Component, type ReactNode } from 'react'
import { Link } from 'react-router-dom'
import './ErrorBoundary.css'

type ErrorBoundaryProps = {
  children: ReactNode
  fallback?: ReactNode
}

type ErrorBoundaryState = {
  hasError: boolean
  error: Error | null
}

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props)
    this.state = { hasError: false, error: null }
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, errorInfo: { componentStack: string }) {
    // Тут можна додати логування в сервіс аналітики
    console.error('ErrorBoundary caught an error:', error, errorInfo)
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null })
  }

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback
      }

      return (
        <div className="error-boundary">
          <div className="error-boundary__content">
            <h1>Щось пішло не так</h1>
            <p>
              Вибачте, сталася несподівана помилка. Ми вже працюємо над її виправленням.
            </p>
            {process.env.NODE_ENV === 'development' && this.state.error && (
              <details className="error-boundary__details">
                <summary>Технічні деталі (тільки для розробки)</summary>
                <pre>{this.state.error.toString()}</pre>
                {this.state.error.stack && (
                  <pre className="error-boundary__stack">{this.state.error.stack}</pre>
                )}
              </details>
            )}
            <div className="error-boundary__actions">
              <button type="button" onClick={this.handleReset} className="uiButton">
                Спробувати знову
              </button>
              <Link to="/" className="uiButton uiButton--ghost">
                На головну
              </Link>
            </div>
          </div>
        </div>
      )
    }

    return this.props.children
  }
}

export default ErrorBoundary

