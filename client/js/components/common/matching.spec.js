import React              from 'react';
import ReactDOM           from 'react-dom';
import TestUtils          from 'react/lib/ReactTestUtils';
import Matching           from './matching';

describe('matching', function() {

  var item = {
    id: 1,
    material: "matching",
    answers: [{
      id: "0",
      matchMaterial: "test",
      material: "match this",
    },
    {
      id: "1",
      matchMaterial: "test",
      material: "match this also",
    }],
    correct: [{
      id: "0",
    }]
  };
  var result = TestUtils.renderIntoDocument(<Matching item={item} name="answer-option" />);

  it('renders the dropdown items', function() {
    expect(ReactDOM.findDOMNode(result).textContent).toContain("test");
    expect(ReactDOM.findDOMNode(result).textContent).toContain("match this");
    expect(ReactDOM.findDOMNode(result).textContent).toContain("match this also");
  });

  it('calls the answerSelected function when change', () => {
    spyOn(result, "answerSelected");
    var select = TestUtils.findRenderedDOMComponentWithTag(result, 'select');
    TestUtils.Simulate.change(select);
    expect(result.answerSelected).toHaveBeenCalled();
  });

});