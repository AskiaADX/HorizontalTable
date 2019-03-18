{%
Dim i1
Dim i2
Dim i3
Dim i4
Dim i5
Dim i6
Dim i7
Dim i8
Dim i9
Dim i10
Dim varLim
Dim row
Dim rowQuestion
Dim ranking
Dim selectbox
Dim rowNumber = 1
For i1 = 2 To 6
    rowQuestion = CurrentADC.PropQuestion("questionRow" + i1)
    If rowQuestion.Id <> DK Then
        rowNumber = i1
    Else
        Break
    EndIf
Next i1
%}
(function () {
  var horizontaltable = new HorizontalTable({
    instanceId: {%= CurrentADC.InstanceId %},
    nbLoopItems: {%= CurrentQuestion.ParentLoop.Answers.Count %},
    responsiveWidth:  parseInt('{%= CurrentADC.PropValue("responsiveWidth") %}',10),
    showTotal: {%= CurrentADC.PropValue("showTotal") %},
    scrollNextIteration: {%= On(CurrentADC.PropValue("scrollNextIteration") = "1", true, false)%},
    autoSubmit: {%= On(CurrentADC.PropValue("autoSubmit") = "yes", true, false)%},
    useSlider: {%= CurrentADC.PropValue("useSlider") %},
    headerFixed: {%= On(CurrentADC.PropValue("headerFixed") = "1", true, false)%},
    stepByStep: {%= On(CurrentADC.PropValue("stepByStep") = "yes", true, false)%},
    questions: [{% For i5 = 1 To rowNumber
    	row = CurrentADC.PropQuestion("questionRow" + i5)
            If ((row.Id = DK) and (i5 = 1)) Then
                row = CurrentQuestion
            EndIf
    %}{%:= On((row.Id <> DK), "'" + row.Shortcut + "'", "null")%}{%= On(i5 <> rowNumber, ",", "") 
		%}{%Next i5 %}],
    maxLimit: [{% For i6 = 1 To rowNumber
    	row = CurrentADC.PropQuestion("questionRow" + i6)
            If ((row.Id = DK) and (i6 = 1)) Then
                row = CurrentQuestion
            Endif
    varLim = CurrentADC.PropValue("maxNumLimit" + i6) %}{%= On((varLim <> "" and row.Type = "numeric" ), varLim, "undefined")%}{%= On(i6 <> rowNumber, ",", "") %}{% Next i6 %}],
    rankingBox: [{% For i7 = 1 To rowNumber
    	row = CurrentADC.PropQuestion("questionRow" + i7)
            If ((row.Id = DK) and (i7 = 1)) Then
                row = CurrentQuestion
            Endif
    ranking = CurrentADC.PropValue("rowAsComboBox" + i7) %}{%= On((ranking = "2") and (row.Type = "single"), true, false)%}{%= On(i7 <> rowNumber, ",", "") %}{% Next i7 %}],
    suffixes: [{% For i8 = 1 To rowNumber
    	row = CurrentADC.PropQuestion("questionRow" + i8)
            If ((row.Id = DK) and (i8 = 1)) Then
                row = CurrentQuestion
            EndIf
    %}{%:= On((row.Type = "numeric"), "'" + CurrentADC.PropValue("numBoxSuffix" + i8) + "'", "''")%}{%= On(i8 <> rowNumber, ",", "") 
		%}{%Next i8 %}],
    decimals: [{% For i9 = 1 To rowNumber
    	row = CurrentADC.PropQuestion("questionRow" + i9)
            If ((row.Id = DK) and (i9 = 1)) Then
                row = CurrentQuestion
            EndIf
    %}{%:= On((row.Type = "numeric"), row.Decimals + "", "")%}{%= On(i9 <> rowNumber, ",", "") 
		%}{%Next i9 %}],
    selectBox: [{% For i10 = 1 To rowNumber
    	row = CurrentADC.PropQuestion("questionRow" + i10)
            If ((row.Id = DK) and (i10 = 1)) Then
                row = CurrentQuestion
            Endif
    selectbox = CurrentADC.PropValue("rowAsComboBox" + i10) %}{%= On((selectbox = "1") and (row.Type = "single"), true, false)%}{%= On(i10 <> rowNumber, ",", "") %}{% Next i10 %}]
  });
  {% 
	For i2 = 1 to rowNumber 
    	row = CurrentADC.PropQuestion("questionRow"+i2)
    	If row.Type = "datetime" Then 
        	If(Not(row.IsDateOnly)) Then
            	For i3 = 1 to CurrentQuestion.ParentLoop.Answers.Count
    				row = CurrentADC.PropQuestion("questionRow"+i2)
					row = row.AllIterations[i3] %}
  var timePicker{%= row.InputCode %} = new TimePicker({
    showSeconds: {%= CurrentADC.PropValue("showSeconds") %},
    stepMinutes: {%= CurrentADC.PropValue("stepMinutes") %},
    stepSeconds: {%= CurrentADC.PropValue("stepSeconds") %},
    imperial: {%= CurrentADC.PropValue("imperial")%},
    hideInput: true,
    minHour: {%= Hour(row.MinDate) %},
    maxHour: {%= Hour(row.MaxDate) %},
    selectedHour: '{%= Hour(row.Iteration(row.ParentLoop.Answers[i3].Index).Value.ToDate()) %}',
    selectedMin: '{%= Minute(row.Iteration(row.ParentLoop.Answers[i3].Index).Value.ToDate()) %}',
    selectedSec: '{%= Second(row.Iteration(row.ParentLoop.Answers[i3].Index).Value.ToDate()) %}',
    question: '{%= row.Shortcut %}',
    adcId: {%= CurrentADC.InstanceId %},
    inputCode: {%= row.InputCode %}
  });
  {%            Next i3
        	EndIf
			row = CurrentADC.PropQuestion("questionRow"+i2)
			If (Not(row.IsTimeOnly)) Then 
				For i4 = 1 to CurrentQuestion.ParentLoop.Answers.Count
    				row = CurrentADC.PropQuestion("questionRow"+i2)
					row = row.AllIterations[i4] %}
  var datePicker{%= row.InputCode %} = new DatePicker({
    adcId: {%= CurrentADC.InstanceId%},
    inputNameX: 'askia-input-date{%= row.InputCode %}',
    defaultDate: '{%= CurrentADC.PropValue("defaultDate").ToString() %}',
    bound: {%= CurrentADC.PropValue("bound") %},
    position: '{%= CurrentADC.PropValue("position").ToString() %}',
    setDefaultDate: {%= CurrentADC.PropValue("setDefaultDate") %},
    firstDay: {%= CurrentADC.PropValue("firstDay").ToNumber() %},
    dpTheme: '{%= CurrentADC.PropValue("theme").ToString() %}',
    disableWeekends: {%= CurrentADC.PropValue("disableWeekends") %},
    showWeekNumber: {%= CurrentADC.PropValue("showWeekNumber") %},
    showMonthAfterYear: {%= CurrentADC.PropValue("showMonthAfterYear") %},
    numberOfMonths: {%= CurrentADC.PropValue("numberOfMonths") %},
    mainCalendar: '{%= CurrentADC.PropValue("mainCalendar") %}',
    minDate: '{%= row.MinDate.Format("yyyy-MM-dd") %}',
    maxDate: '{%= row.MaxDate.Format("yyyy-MM-dd") %}',
    minBound: {%= On(CvDkNa(row.MinDate.Format("yyyy").ToNumber()) < 1,1900,row.MinDate.Format("yyyy").ToNumber()) %},
    maxBound: {%= On(CvDkNa(row.MaxDate.Format("yyyy").ToNumber()) < 1,2100,row.MaxDate.Format("yyyy").ToNumber()) %},
    xdefaultDate: '{%= CurrentADC.PropValue("defaultDate").ToString() %}',
    xminBound: '{%= On(CvDkNa(row.MinDate.Format("yyyy").ToNumber()) < 1,1900,row.MinDate.Format("yyyy").ToNumber()) %}',
    xmaxBound: '{%= On(CvDkNa(row.MaxDate.Format("yyyy").ToNumber()) < 1,2100,row.MaxDate.Format("yyyy").ToNumber()) %}',
    lang: {%= Interview.Language.Id %},
    question: '{%:= row.Shortcut %}'
  });
    {% 	  		Next i4
        	EndIf
		EndIf
	Next i2 %}
} ());