import React                  from 'react';
import { connect }            from 'react-redux';
import AssessmentForm         from './assessment_form';
import Heading                from  '../common/heading';
import { colors, buttonStyle }  from '../../defines';
import * as BankActions       from '../../../actions/qbank/banks';
import * as AssessmentActions from '../../../actions/qbank/assessments';
import * as ItemActions       from '../../../actions/qbank/items';

function select() {
  return {

  };
}
export class NewAssessment extends React.Component {
  static propTypes = {
    params: React.PropTypes.shape({ id: React.PropTypes.string }).isRequired,
    createAssessment: React.PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);
    this.titleField = null;
    this.state = {
      assessment: {},
    };
  }

  createAssessment() {
    this.props.createAssessment(
      this.props.params.id,
      this.state.assessment,
    );
  }

  updateStateAssessment(field, value) {
    this.setState({ assessment: { ...this.state.assessment, [field]: value } });
  }

  saveButton() {
    return (
      <button
        style={{ ...buttonStyle, ...NewAssessment.styles.button }}
        onClick={() => this.createAssessment()}
      >
        Save Assessment
      </button>
    );
  }

  editItem(itemIndex, field, data) {
    const items = this.state.items;
    items[itemIndex][field] = data;
    this.setState({ items });
  }

  addItem() {
    const items = this.state.items;
    items.push({ bankId: this.props.params.id, choices: [{}] });
    this.setState({ items });
  }

  render() {
    return (
      <div>
        <Heading view="assessments" />
        <AssessmentForm
          {...this.state.assessment}
          updateAssessment={() => this.createAssessment()}
          updateStateAssessment={(field, value) => this.updateStateAssessment(field, value)}
        />
      </div>
    );
  }
}
// { this.titleField.value }
export default connect(select, {
  ...BankActions,
  ...AssessmentActions,
  ...ItemActions
})(NewAssessment);
