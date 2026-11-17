import { useState } from 'react'
// import heroImg from '../../../assets/hero.png'
// import reactLogo from '../../../assets/react.svg'
// import viteLogo from '../../../assets/vite.svg'
// import '../../../App.css'

export default function StorefrontPage() {
  const [count, setCount] = useState(0)

  return (
    <>
      <section id="center">
        {/* <div className="hero">
          <img src={heroImg} className="base" width="170" height="179" alt="" />
          <img src={reactLogo} className="framework" alt="React logo" />
          <img src={viteLogo} className="vite" alt="Vite logo" />
        </div> */}
        {/* <div>
          <h1>Get started</h1>
          <p>Edit <code>src/features/storefront/pages/StorefrontPage.jsx</code> and save to test <code>HMR</code></p>
        </div> */}
        <button type="button" className="counter" onClick={() => setCount((value) => value + 1)}>
          Count is {count}
        </button>
      </section>

      <div className="ticks" />
      <section id="next-steps">

      </section>
      <div className="ticks" />
      <section id="spacer" />
    </>
  )
}
