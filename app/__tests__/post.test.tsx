import React from 'react'
import renderer from 'react-test-renderer'

import { Post } from '../components/post/post'

it("renders post component", ()=>{
    const tree = renderer.create(<Post postTitle='Hello'/>).toJSON()   
    expect(tree).toBeDefined()
})

it("post component hello", ()=>{
    const tree = renderer.create(<Post postTitle='Hello'/>).toJSON()
    expect(tree.children[0].children[0]).toBe('Hello')
})