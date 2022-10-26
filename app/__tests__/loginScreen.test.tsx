import React from 'react'
import renderer from 'react-test-renderer'

import { LoginScreen } from '../screens' 

it("renders post component", ()=>{
    const tree = renderer.create(<LoginScreen navigation={undefined} route={undefined} />).toJSON()   
    expect(tree).toBeDefined()
    // expect(1+2).not.toBe(5)
})