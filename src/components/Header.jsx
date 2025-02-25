import React from 'react'
import { Link } from 'react-router-dom'
import '../styles/Header.module.css'

export const Header =() => {
  return (
    <>
      <header>
        <Link to="/">Blog</Link>
        <Link to="/contact">お問い合わせ</Link>
      </header>
    </>
  )
}
