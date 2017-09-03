import * as React from 'react'
import * as classnames from 'classnames'

export const Footer = props =>
  <footer className={classnames('row', 'Footer')}>
    <hr/>
    <div className="col-12">
      <ul>
        <li>
          <a href="mailto:deptno@gmail.com">deptno@gmail.com</a>
        </li>
        <li>
          <a href="http://bglee.me">blog</a>
        </li>
        <li>
          <a href="https//github.com/bongso/coin-wall">github</a>
        </li>
      </ul>
    </div>
  </footer>
