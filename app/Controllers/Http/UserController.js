'use strict'

const User = use('App/Models/User')
const Validator = use('Validator')

class UserController {
  get validationRules () {
    return {
      email: 'required|email|unique:users',
      password: 'required|min:6',
      name: 'required'
    }
  }

  async login ({ auth, request }) {
    const { email, password } = request.all()
    try {
      const token = await auth.attempt(email, password)
      return { status: true, ...token } 
    } catch {
      return { status: false }
    }
  }

  async register ({ request }) {
    const validation = await Validator.validateAll(request.all(), this.validationRules)
    if (validation.fails()) return { status: false, messages: validation.messages() }
    const { email, password, name } = request.all()
    const user = new User()
    user.email = email
    user.password = password
    user.name = name
    await user.save()
    return { status: true, user }
  }

  async revokeTokens ({ auth }) {
    try {
      await auth.authenticator('api').revokeTokens()
      return { status: true }
    } catch {
      return { status: false }
    }
  }

  async getUser ({ auth }) {
    return await auth.getUser()
  }
}

module.exports = UserController
