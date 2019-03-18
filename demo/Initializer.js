(function () {
  var horizontaltable = new HorizontalTable({
    instanceId: 1,
    showTotal: 2,
    headerFixed: true,
    questions: ['Like', 'Quantity', 'Comment', 'YesNo', 'Time' ],
    maxLimit: [ undefined, 100, undefined, undefined, undefined ]
  });
} ());