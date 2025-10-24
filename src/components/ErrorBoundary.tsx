import React, { Component, ErrorInfo, ReactNode } from 'react';
import styles from './ErrorBoundary.module.css';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      hasError: false,
      error: null
    };
  }

  static getDerivedStateFromError(error: Error): State {
    return {
      hasError: true,
      error
    };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    console.error('ErrorBoundary caught an error:', error, errorInfo);
  }

  handleReset = (): void => {
    this.setState({
      hasError: false,
      error: null
    });
    // Перезагружаем страницу для полного сброса состояния
    window.location.reload();
  };

  render(): ReactNode {
    if (this.state.hasError) {
      return (
        <div className={styles.container}>
          <div className={styles.card}>
            <div className={styles.icon}>⚠️</div>
            <h1 className={styles.title}>Что-то пошло не так</h1>
            <p className={styles.message}>
              Произошла непредвиденная ошибка. Пожалуйста, попробуйте перезагрузить приложение.
            </p>
            {this.state.error && (
              <details className={styles.details}>
                <summary>Детали ошибки</summary>
                <pre className={styles.error}>{this.state.error.toString()}</pre>
              </details>
            )}
            <button className={styles.button} onClick={this.handleReset}>
              Перезагрузить приложение
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
