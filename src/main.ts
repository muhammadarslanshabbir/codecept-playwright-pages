import './style.css'

type Task = {
  id: number
  title: string
  done: boolean
}

const app = document.querySelector<HTMLDivElement>('#app')

if (!app) {
  throw new Error('App container not found')
}

app.innerHTML = `
  <main class="shell">
    <header class="hero">
      <p class="eyebrow">CodeceptJS + Playwright demo</p>
      <h1>Task Pilot</h1>
      <p class="lede">Add a few tasks, mark them done, and practice running end-to-end checks.</p>
      <div class="stats" id="task-summary" aria-live="polite">Total: 0 · Completed: 0</div>
    </header>

    <section class="panel">
      <form id="task-form" aria-label="Add a task" novalidate>
        <label class="label" for="task-input">Task name</label>
        <div class="input-row">
          <input
            id="task-input"
            name="task"
            type="text"
            placeholder="e.g. Write CodeceptJS scenario"
            autocomplete="off"
            minlength="3"
            required
          />
          <button id="add-task" type="submit">Add task</button>
        </div>
        <p class="helper" id="helper-text" aria-live="polite">Tasks need at least 3 characters.</p>
      </form>
    </section>

    <section class="panel">
      <div class="list-header">
        <h2>Today</h2>
        <span class="pill pill--accent" id="filter-label">Demo-friendly UI</span>
      </div>
      <ul id="task-list" aria-live="polite" aria-label="Task list"></ul>
      <p id="empty-state" class="empty">No tasks yet. Add one to get started.</p>
    </section>
  </main>
`

const tasks: Task[] = []

const summaryEl = document.querySelector<HTMLDivElement>('#task-summary')
const form = document.querySelector<HTMLFormElement>('#task-form')
const input = document.querySelector<HTMLInputElement>('#task-input')
const helper = document.querySelector<HTMLParagraphElement>('#helper-text')
const listEl = document.querySelector<HTMLUListElement>('#task-list')
const emptyState = document.querySelector<HTMLParagraphElement>('#empty-state')

const requireElements = [
  summaryEl,
  form,
  input,
  helper,
  listEl,
  emptyState,
] as const

if (requireElements.some((el) => !el)) {
  throw new Error('Missing required UI elements')
}

const typedSummary = summaryEl!
const typedForm = form!
const typedInput = input!
const typedHelper = helper!
const typedList = listEl!
const typedEmpty = emptyState!

const renderSummary = () => {
  const completed = tasks.filter((task) => task.done).length
  typedSummary.textContent = `Total: ${tasks.length} · Completed: ${completed}`
}

const renderTasks = () => {
  typedList.innerHTML = ''

  if (tasks.length === 0) {
    typedEmpty.hidden = false
    renderSummary()
    return
  }

  typedEmpty.hidden = true

  tasks.forEach((task) => {
    const item = document.createElement('li')
    item.className = `task ${task.done ? 'task--done' : ''}`
    item.dataset.id = task.id.toString()
    item.setAttribute('aria-checked', task.done ? 'true' : 'false')

    const title = document.createElement('span')
    title.className = 'task__title'
    title.textContent = task.title

    const actions = document.createElement('div')
    actions.className = 'task__actions'

    const toggle = document.createElement('button')
    toggle.type = 'button'
    toggle.textContent = task.done ? 'Mark undone' : 'Mark done'
    toggle.dataset.testid = 'toggle-task'
    toggle.addEventListener('click', () => {
      task.done = !task.done
      renderTasks()
    })

    const remove = document.createElement('button')
    remove.type = 'button'
    remove.textContent = 'Delete'
    remove.dataset.testid = 'delete-task'
    remove.addEventListener('click', () => {
      const index = tasks.indexOf(task)
      if (index >= 0) {
        tasks.splice(index, 1)
      }
      renderTasks()
    })

    actions.append(toggle, remove)
    item.append(title, actions)
    typedList.append(item)
  })

  renderSummary()
}

typedForm.addEventListener('submit', (event) => {
  event.preventDefault()
  const value = typedInput.value.trim()

  if (value.length < 3) {
    typedHelper.textContent = 'Please add at least 3 characters.'
    typedInput.focus()
    return
  }

  tasks.push({
    id: Date.now(),
    title: value,
    done: false,
  })

  typedInput.value = ''
  typedHelper.textContent = 'Nice! Task added.'
  renderTasks()
})

renderTasks()
