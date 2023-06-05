import Cookies from 'js-cookie'
import Axios from 'axios'

export const getMeApi = async ({ token }) => {
  try {
    const result = await Axios({
      method: 'GET',
      url: `${process.env.NEXT_PUBLIC_API}/user/me`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    return result
  } catch (error) {
    throw error
  }
}

export const updatePasswordApi = async ({ payload, token }) => {
  try {
    const result = await Axios({
      method: 'POST',
      url: `${process.env.NEXT_PUBLIC_API}/update-password`,
      data: payload,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    return result
  } catch (error) {
    throw error
  }
}

export const authApi = async ({ endpoint, payload }) => {
  try {
    const result = await Axios({
      method: 'POST',
      url: `${process.env.NEXT_PUBLIC_API}${endpoint}`,
      data: payload,
    })
    return result
  } catch (error) {
    throw error
  }
}

export const logoutApi = async () => {
  try {
    const result = await Axios({
      method: 'GET',
      url: `${process.env.NEXT_PUBLIC_API}/logout`,
      headers: {
        Authorization: `Bearer ${Cookies.get('tknMembership')}`,
      },
    })
    return result
  } catch (error) {
    throw error
  }
}

export const createApi = async ({ endpoint, payload }) => {
  try {
    const result = await Axios({
      method: 'POST',
      url: `${process.env.NEXT_PUBLIC_API}${endpoint}`,
      data: payload,
      headers: {
        Authorization: `Bearer ${Cookies.get('tknMembership')}`,
      },
    })
    return result
  } catch (error) {
    throw error
  }
}

export const updateApi = async ({ endpoint, payload }) => {
  try {
    const result = await Axios({
      method: 'PATCH',
      url: `${process.env.NEXT_PUBLIC_API}${endpoint}`,
      data: payload,
      headers: {
        Authorization: `Bearer ${Cookies.get('tknMembership')}`,
      },
    })
    return result
  } catch (error) {
    throw error
  }
}

export const deleteApi = async ({ endpoint }) => {
  try {
    const result = await Axios({
      method: 'DELETE',
      url: `${process.env.NEXT_PUBLIC_API}${endpoint}`,
      headers: {
        Authorization: `Bearer ${Cookies.get('tknMembership')}`,
      },
    })
    return result
  } catch (error) {
    throw error
  }
}

export const restoreApi = async ({ endpoint }) => {
  try {
    const result = await Axios({
      method: 'POST',
      url: `${process.env.NEXT_PUBLIC_API}${endpoint}`,
      headers: {
        Authorization: `Bearer ${Cookies.get('tknMembership')}`,
      },
    })
    return result
  } catch (error) {
    throw error
  }
}

export const randomColor = () => {
  const color = [
    '#f9ca24',
    '#f0932b',
    '#f9ca24',
    '#6ab04c',
    '#5B8FF9',
    '#5B8FF9',
    '#eb4d4b',
    '#eb4d4b',
    '#be2edd',
    '#e056fd',
    '#7ed6df',
    '#30336b',
  ]
  const randomNumber = Math.round(
    Math.random() * (color.length - 0) + 0,
  )
  return color[randomNumber]
}
