"use strict";


const constants = [
  "ANSWER_SELECTED",
  "QUESTION_SELECTED"
];

const requests = [
  "ASSESSMENTS_LOADED",
  "ASSESSMENT_START"
];


export function loadAssessment(settings, srcData){

  if(srcData){
    srcData = srcData.trim();
    if(srcData.length > 0){
      Dispatcher.dispatch({
        action: Constants.LOAD_ASSESSMENT,
        settings: settings,
        data: {
          text: srcData
        }
      });
      return;
    }
  }

  Api.get(Constants.ASSESSMENT_LOADED, settings.srcUrl);
}


export function start(eid, assessmentId, contextId=null){
    //Dispatcher.dispatch({action: Constants.ASSESSMENT_START})
    if(eid && assessmentId){
      Api.put(Constants.ASSESSMENT_START, "/api/user_assessments/"+eid, {assessmentId: assessmentId, lti_context_id: contextId})
    }
  }

  // edXLoadSection(section){
  //   Dispatcher.dispatch({action: Constants.EDX_LOAD_SECTION, section: section});
  // }
  //
  // edXLoadItem(item){
  //   Dispatcher.dispatch({action: Constants.EDX_LOAD_ITEM, item: item});
  // }
  //
  // edXLoadAssessment(assessment){
  //   Dispatcher.dispatch({action: Constants.EDX_LOAD_ASSESSMENT, assessment: assessment});
  // }

export function answerSelected(item){
    Dispatcher.dispatch({action: Constants.ANSWER_SELECTED, item: item});
  }

export const selectQuestion = (index)=>({action: Constants.QUESTION_SELECTED, index: index});
export const selectQuestion = (index)=>({action: Constants.QUESTION_SELECTED, index: index});
export const checkAnswer = () => ({ action: Constants.ASSESSMENT_CHECK_ANSWER });

  selectConfidenceLevel(level, index){
    Dispatcher.dispatch({action: Constants.LEVEL_SELECTED, level: level, index: index});
  }

  submitAssessment(identifier, assessmentId, questions, studentAnswers, settings, outcomes){
    Dispatcher.dispatch({action: Constants.ASSESSMENT_SUBMITTED});
    // Only send data needed for server-side grading.
    questions = questions.map(function(q){
      return {
        id: q.id,
        score: q.score,
        confidenceLevel: q.confidenceLevel,
        timeSpent: q.timeSpent,
        startTime: q.startTime,
        outcome_guid: q.outcome_guid
      }
    });
    settings = {
      externalUserId: settings.externalUserId,
      externalContextId: settings.externalContextId,
      userAssessmentId: settings.userAssessmentId,
      ltiLaunchId: settings.ltiLaunchId,
      userAttempts: settings.userAttempts,
      srcUrl: settings.srcUrl,
      lisResultSourceDid: settings.lisResultSourceDid,
      lisOutcomeServiceUrl: settings.lisOutcomeServiceUrl,
      lisUserId: settings.lisUserId,
      isLti: settings.isLti,
      ltiRole: settings.ltiRole,
      assessmentKind: settings.assessmentKind,
      accountId: settings.accountId
    };
    var body = {
      itemToGrade: {
        questions    : questions,
        answers      : studentAnswers,
        assessmentId : assessmentId,
        identifier   : identifier,
        settings     : settings
      }
    };
    Api.post(Constants.ASSESSMENT_GRADED,'api/grades', body);
  }

  nextQuestion(){
    Dispatcher.dispatch({ action: Constants.ASSESSMENT_NEXT_QUESTION });
  }

  previousQuestion(){
    Dispatcher.dispatch({ action: Constants.ASSESSMENT_PREVIOUS_QUESTION });
  }

  retakeAssessment(){
    Dispatcher.dispatch({action: Constants.RETAKE_ASSESSMENT})
  }

  assessmentViewed(settings, assessment){
    var body = {
      assessment_result : {
        offline          : settings.offline,
        assessment_id    : settings.assessmentId,
        identifier       : assessment.id,
        eId              : settings.eId,
        external_user_id : settings.externalUserId,
        external_context_id : settings.externalContextId,
        resultsEndPoint  : settings.resultsEndPoint,
        keywords         : settings.keywords,
        objectives       : assessment.objectives,
        src_url          : settings.srcUrl
      }
    };
    Api.post(Constants.ASSESSMENT_VIEWED, '/api/assessment_results', body);
  }

  assessmentPostAnalytics(results_id, user_id='', context_id=''){
    Api.post(Constants.ASSESSMENT_POST_ANALYTICS, 'api/assessment_results/' + results_id + '/send?external_user_id=' + user_id + '&external_context_id=' + context_id);
  }

  assessmentPostLtiOutcome(results_id){
    Api.post(Constants.ASSESSMENT_POST_LTI_OUTCOME, 'api/assessment_results/' + results_id + '/lti_outcome');
  }

  itemViewed(settings, assessment, assessment_result){
    var body = {
      item_result : {
        offline              : settings.offline,
        assessment_result_id : assessment_result.id,
        assessment_id        : settings.assessmentId,
        identifier           : assessment.id,
        eId                  : settings.eId,
        external_user_id     : settings.externalUserId,
        resultsEndPoint      : settings.resultsEndPoint,
        keywords             : settings.keywords,
        objectives           : assessment.objectives,
        src_url              : settings.srcUrl
      }
    };
    Api.post(Constants.ASSESSMENT_VIEWED, '/api/item_results', body);
  }