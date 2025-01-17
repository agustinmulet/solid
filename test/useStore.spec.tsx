import { atom } from 'nanostores'
import { createSignal } from 'solid-js'
import { render } from 'solid-js/web'
import { delay } from 'nanodelay'
import { useStore } from '../src/solid-nanostores'

it('renders correct in Solid', async () => {
    let renders = 0
    
    const letterStore = atom<{ letter: string }>({ letter: 'a' })

    const div = document.createElement('div')
    const [show, setShow] = createSignal(true)

    const dispose = render(() => {
        const store = useStore(letterStore)
        renders += 1
        return (
            <>
                { show() && <div data-testid="test">{store.letter}</div> }
            </>
        )
    }, div)
    
    expect(div.querySelector('[data-testid="test"]').textContent).toBe('a')
    expect(renders).toEqual(1)

    letterStore.set({ letter: 'b' })
    letterStore.set({ letter: 'c' })

    expect(div.querySelector('[data-testid="test"]').textContent).toBe('c')
    expect(renders).toEqual(1)

    setShow(false)
    expect(div.querySelector('[data-testid="test"]')).toBeNull()
    expect(renders).toEqual(1)
    dispose()
    await delay(1000)
})