<h1 align="center">☄️ transition-hook</h1>

<p align="center">
  <a href="https://github.com/iamyoki/transition-hook/actions/workflows/test.yml"><img src="https://github.com/iamyoki/transition-hook/actions/workflows/test.yml/badge.svg" alt="🧪 Run Tests"></a>
  <a href="https://github.com/iamyoki/transition-hook/actions/workflows/release.yml"><img src="https://github.com/iamyoki/transition-hook/actions/workflows/release.yml/badge.svg" alt="🚀 Release The Package"></a>
</p>

<p align="center">An extreme light-weight react transition animation hook which is simpler and easier to use than <a href="http://reactcommunity.org/react-transition-group">react-transition-group</a></p>
<br>

- [Installation](#installation)
- [Usage](#usage)
  - [useTransition](#usetransition)
  - [Transition](#transition)
- [License](#license)

## Installation

Install with yarn

```bash
yarn add transition-hook
```

Or install with npm

```bash
npm install transition-hook --save
```

## Usage

### useTransition

```jsx
const [onOff, setOnOff] = useState(true)
const {stage, shouldMount} = useTransition(onOff, 300) // (state, timeout)

return <div>
  <button onClick={()=>setOnOff(!onOff)}>toggle</button>
  {shouldMount && (
    <p style={{
      transition: '.3s',
      opacity: stage === 'enter' ? 1 : 0
    }}>
      Hey guys, I'm fading
    </p>
  )}
</div>
```

### Transition

```jsx
const [onOff, setOnOff] = useState(true)

return <div>
  <button onClick={()=>setOnOff(!onOff)}>toggle</button>
  <Transition state={onOff} timeout={300}>
    {(stage, shouldMount)=>shouldMount &&(
      <p style={{
        transition: '.3s',
        opacity: stage === 'enter' ? 1 : 0
      }}>
        Hey guys, I'm fading
      </p>
    )}
  </Transition>
</div>
```

## License

[MIT](https://choosealicense.com/licenses/mit/)
