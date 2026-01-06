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

Scenario('block too-short tasks and keep counts unchanged', ({ I }) => {
  I.see('No tasks yet', '#empty-state')
  I.fillField('#task-input', 'hi')
  I.click('#add-task')
  I.see('Please add at least 3 characters.', '#helper-text')
  I.see('Total: 0', '#task-summary')
  I.dontSee('hi', '#task-list')
})

Scenario('empty state hides when tasks exist and returns when cleared', ({ I }) => {
  I.fillField('#task-input', 'First task')
  I.click('#add-task')
  I.fillField('#task-input', 'Second task')
  I.click('#add-task')

  I.dontSeeElement('#empty-state:not([hidden])')
  I.see('Total: 2', '#task-summary')

  I.click(locate('button').withText('Delete').last())
  I.click(locate('button').withText('Delete').last())

  I.see('No tasks yet', '#empty-state')
  I.see('Total: 0', '#task-summary')
})

Scenario('toggle updates aria state and button text', ({ I }) => {
  I.fillField('#task-input', 'Toggle me')
  I.click('#add-task')

  const toggleBtn = locate('button').withAttr({ 'data-testid': 'toggle-task' }).first()
  I.seeElement(toggleBtn.withText('Mark done'))
  I.click(toggleBtn)

  I.seeElement(locate('li.task').withAttr({ 'aria-checked': 'true' }))
  I.seeElement(toggleBtn.withText('Mark undone'))
  I.see('Completed: 1', '#task-summary')
})
