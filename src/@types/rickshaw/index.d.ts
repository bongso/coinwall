declare module 'rickshaw' {
  export const Class
  export const Color
  export const Compat
  export const Fixtures
  export const Graph: Graph
  export const Series
  export const clone
  export const extend
  export const keys
  export const namespace
  export const version: string

  interface Graph {
    new (a: GraphArgs): {
      render()
      configure()
      onUpdate(f)
    }
    Legend
    HoverDetail
    JSONP
    Annotate
    RangeSlider: {
      Preview
    }
    Axis: {
      Time
      X
      Y: {
        new (a: any)
        Scaled?
      }
    }
    Behavior: {
      Series: {
        Highlight
        Order
        Toggle
      }
    }
  }
  interface GraphArgs {
    element: Element
    width?: number
    height?: number
    series?: Series[]
    renderer?: {
      name: string
      area
      stack
      bar
      line
      scatterplot
    }
    min?
    max?
    padding?: {
      top: number
      right: number
      bottom: number
      left: number
    }
    interpolation?: 'cardinal' | 'linear' | 'step-after' | 'basis' | 'stack'
    stack?: 'true'
    unstack?: 'true'
  }
  interface Series {
    name?: string
    color?: Color
    data: any[]
  }
  type Color = string
}
