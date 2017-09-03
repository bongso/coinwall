import * as React from 'react'
import * as currency from 'currency-formatter'

export const date = cell => <span>{cell.format('HH시 mm분 ss초')}</span>

export const w10000 = amount => amount ? `${comma(amount, 0, 10000)} 만원` : '-'
export const w1000 = amount => amount ? `${comma(amount, 0, 1000)} 천원` : '-'

export const comma = (raw: number, precision = 0, unit = 1): string => currency.format(raw / unit, {precision})