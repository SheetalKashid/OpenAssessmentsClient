"use strict";

import React                    from "react";
import * as AssessmentActions   from "../../actions/assessment";
import Styles                   from "../../themes/selection.js";

const styles = Styles;

export default class CheckBox extends React.Component{

  static propTypes = {
    item: React.PropTypes.object.isRequired,
    name: React.PropTypes.string.isRequired
  }

  answerSelected(){
    AssessmentActions.answerSelected(this.props.item);
  }

  checkedStatus(){
    var checked = null;
    var optionFlag = null;
    if( this.props.checked === true ) {
      checked = "true";
    } else if ( this.props.checked === false ){
      checked = false;
    } else if ( !this.props.isDisabled ) {
      checked = (this.props.studentAnswers && this.props.studentAnswers.indexOf(this.props.item.id) > -1) ? "true" : null;
    }
    return checked;
  }

  optionFlagStatus(){
    if(this.props.showAsCorrect){
      var label = "Correct Answer that was ";
      var optionFlag;
      label += this.checkedStatus() ? "chosen" : "not chosen";
      optionFlag = <div className="correctIndicator" aria-label={label} style={styles.checkStyleCorrect}>&#10003;</div>;
    } else if (this.props.showAsCorrect === false && this.checkedStatus()){
      optionFlag = <div className="wrongIndicator" aria-label="Wrong answer that was chosen" style={styles.checkStyleWrong}>&#10008;</div>;
    }
    return optionFlag;
  }

  render(){

    return (
      <div>
        {this.optionFlagStatus()}
        <div className="btn btn-block btn-question" style={styles.btnQuestion}>
          <label>
            <input type="checkbox" defaultChecked={this.checkedStatus()} disabled={this.props.isDisabled} name={this.props.name} onClick={()=>{ this.answerSelected(); }}/>
            <span style={styles.span}>{this.props.item.material}</span>
          </label>
        </div>
      </div>
    );
  }
}