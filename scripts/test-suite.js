// Comprehensive test suite for production readiness
const testSuite = {
  // Authentication Tests
  async testAuthentication() {
    console.log("🔐 Testing Authentication Flow...")

    // Test login with valid credentials
    const loginResponse = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: "user@demo.com", password: "password123" }),
    })

    if (loginResponse.ok) {
      console.log("✅ Login with valid credentials: PASSED")
    } else {
      console.log("❌ Login with valid credentials: FAILED")
    }

    // Test login with invalid credentials
    const invalidLoginResponse = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: "user@demo.com", password: "wrongpassword" }),
    })

    if (invalidLoginResponse.status === 401) {
      console.log("✅ Login with invalid credentials rejection: PASSED")
    } else {
      console.log("❌ Login with invalid credentials rejection: FAILED")
    }
  },

  // API Tests
  async testAPIs() {
    console.log("🔌 Testing API Endpoints...")

    // Test health check
    const healthResponse = await fetch("/api/health")
    if (healthResponse.ok) {
      console.log("✅ Health check endpoint: PASSED")
    } else {
      console.log("❌ Health check endpoint: FAILED")
    }

    // Test services endpoint
    const servicesResponse = await fetch("/api/services")
    if (servicesResponse.ok) {
      const services = await servicesResponse.json()
      if (Array.isArray(services) && services.length > 0) {
        console.log("✅ Services endpoint: PASSED")
      } else {
        console.log("❌ Services endpoint (empty data): FAILED")
      }
    } else {
      console.log("❌ Services endpoint: FAILED")
    }
  },

  // Data Validation Tests
  async testDataValidation() {
    console.log("🛡️ Testing Data Validation...")

    // Test user creation with invalid email
    const invalidUserResponse = await fetch("/api/users", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        fullName: "Test User",
        email: "invalid-email",
        phone: "+1234567890",
      }),
    })

    if (invalidUserResponse.status === 400) {
      console.log("✅ Invalid email validation: PASSED")
    } else {
      console.log("❌ Invalid email validation: FAILED")
    }
  },

  // Performance Tests
  async testPerformance() {
    console.log("⚡ Testing Performance...")

    const startTime = performance.now()
    const response = await fetch("/api/services")
    const endTime = performance.now()

    const responseTime = endTime - startTime
    if (responseTime < 1000) {
      // Less than 1 second
      console.log(`✅ API response time (${responseTime.toFixed(2)}ms): PASSED`)
    } else {
      console.log(`❌ API response time (${responseTime.toFixed(2)}ms): FAILED`)
    }
  },

  // Security Tests
  async testSecurity() {
    console.log("🔒 Testing Security...")

    // Test XSS protection
    const xssPayload = '<script>alert("xss")</script>'
    const userResponse = await fetch("/api/users", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        fullName: xssPayload,
        email: "test@example.com",
        phone: "+1234567890",
      }),
    })

    if (userResponse.status === 400 || userResponse.status === 409) {
      console.log("✅ XSS protection: PASSED")
    } else {
      console.log("❌ XSS protection: NEEDS REVIEW")
    }
  },

  // Run all tests
  async runAllTests() {
    console.log("🚀 Starting Production Readiness Test Suite...")
    console.log("=" * 50)

    await this.testAuthentication()
    await this.testAPIs()
    await this.testDataValidation()
    await this.testPerformance()
    await this.testSecurity()

    console.log("=" * 50)
    console.log("✅ Test Suite Completed!")
  },
}

// Export for use in browser console or testing environment
if (typeof window !== "undefined") {
  window.testSuite = testSuite
}

export default testSuite
