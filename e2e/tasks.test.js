Feature('Task list')

Before(({ I }) => {
  I.amOnPage('/')
})

Scenario('add, complete, and remove tasks', async ({ I }) => {
  I.see('Task Pilot')
  I.see('No tasks yet', '#empty-state')

  I.fillField('#task-input', 'Write CodeceptJS scenario')
  I.click('#add-task')
  I.see('Write CodeceptJS scenario', '#task-list')
  I.see('Total: 1', '#task-summary')

  I.fillField('#task-input', 'Push to GitHub Pages')
  I.click('#add-task')
  I.see('Push to GitHub Pages', '#task-list')
  I.see('Total: 2', '#task-summary')

  const toggleFirst = locate('button').withAttr({ 'data-testid': 'toggle-task' }).first()
  I.click(toggleFirst)
  I.see('Completed: 1', '#task-summary')
  I.seeElement(locate('li.task').withAttr({ 'aria-checked': 'true' }))

  const deleteLast = locate('button').withText('Delete').last()
  I.click(deleteLast)
  I.see('Total: 1', '#task-summary')
})
