import React, { Component } from 'react'
import {
  BrowserRouter,
  Routes,
  Route,
  Link,
} from "react-router-dom"
import { NavbarComponent } from './components'
import { Home, Sukses } from './pages'

export default class App extends Component {
  render() {
    return (
      <div>
        <BrowserRouter>
          <NavbarComponent />
          <main>
              <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/sukses' element={<Sukses />} />
              </Routes>
          </main>
        </BrowserRouter>
      </div>
    )
  }
}
