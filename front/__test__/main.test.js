import React from "react"
import renderer from "react-test-renderer"
import Main from "../src/screens/Main"

test('Main 페이지가 정상적으로 렌더링 되나요?', () => {
    const tree = renderer.create(<Main/>).toJSON();
    expect(tree).toMatchSnapshot();
})