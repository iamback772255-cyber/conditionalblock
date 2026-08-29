/**
 * Metrics Service
 * Collects and manages real-time metrics and analytics
 */

class MetricsService {
  constructor() {
    this.metrics = {
      requests: 0,
      errors: 0,
      contracts: 0,
      transactions: 0,
      users: 0,
      avgResponseTime: 0,
      uptime: Date.now(),
    };
    this.requestTimes = [];
  }

  recordRequest(duration) {
    this.metrics.requests++;
    this.requestTimes.push(duration);
    if (this.requestTimes.length > 1000) {
      this.requestTimes.shift();
    }
    this.updateAverageResponseTime();
  }

  recordError() {
    this.metrics.errors++;
  }

  recordContract() {
    this.metrics.contracts++;
  }

  recordTransaction() {
    this.metrics.transactions++;
  }

  recordUser() {
    this.metrics.users++;
  }

  updateAverageResponseTime() {
    if (this.requestTimes.length === 0) return;
    const sum = this.requestTimes.reduce((a, b) => a + b, 0);
    this.metrics.avgResponseTime = (sum / this.requestTimes.length).toFixed(2);
  }

  getMetrics() {
    return {
      ...this.metrics,
      uptime: Date.now() - this.metrics.uptime,
    };
  }

  resetMetrics() {
    this.metrics = {
      requests: 0,
      errors: 0,
      contracts: 0,
      transactions: 0,
      users: 0,
      avgResponseTime: 0,
      uptime: Date.now(),
    };
    this.requestTimes = [];
  }
}

export default new MetricsService();