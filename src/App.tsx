import { useState } from 'react';

const Calculator = () => {
  const [input, setInput] = useState('0');
  const [previousInput, setPreviousInput] = useState('');
  const [operator, setOperator] = useState<string | null>(null);
  const [waitingForOperand, setWaitingForOperand] = useState(false);

  const inputDigit = (digit: string) => {
    if (waitingForOperand) {
      setInput(digit);
      setWaitingForOperand(false);
    } else {
      setInput(input === '0' ? digit : input + digit);
    }
  };

  const inputDecimal = () => {
    if (waitingForOperand) {
      setInput('0.');
      setWaitingForOperand(false);
      return;
    }

    if (!input.includes('.')) {
      setInput(input + '.');
    }
  };

  const clearInput = () => {
    setInput('0');
    setPreviousInput('');
    setOperator(null);
    setWaitingForOperand(false);
  };

  // New backspace function
  const backspace = () => {
    if (input.length > 1) {
      setInput(input.slice(0, -1));
    } else {
      setInput('0');
    }
  };

  // const toggleSign = () => {
  //   setInput(input.charAt(0) === '-' ? input.substr(1) : '-' + input);
  // };

  const inputPercent = () => {
    const value = parseFloat(input);
    setInput(String(value / 100));
  };

  const performOperation = (nextOperator: string) => {
    const inputValue = parseFloat(input);

    if (previousInput === '') {
      setPreviousInput(input);
    } else if (operator) {
      const previousValue = parseFloat(previousInput);
      let newValue;

      switch (operator) {
        case '+':
          newValue = previousValue + inputValue;
          break;
        case '-':
          newValue = previousValue - inputValue;
          break;
        case '*':
          newValue = previousValue * inputValue;
          break;
        case '/':
          newValue = previousValue / inputValue;
          break;
        default:
          newValue = inputValue;
      }

      setPreviousInput(String(newValue));
      setInput(String(newValue));
    }

    setWaitingForOperand(true);
    setOperator(nextOperator);
  };

  const handleEquals = () => {
    if (operator && !waitingForOperand) {
      performOperation(operator);
      setOperator(null);
    }
  };

  const buttonStyle = {
    border: 'none',
    cursor: 'pointer',
    fontSize: 'clamp(1rem, 2.5vw, 1.2rem)',
    fontWeight: '600',
    padding: 'clamp(12px, 3vw, 18px)',
    borderRadius: 'clamp(8px, 2vw, 12px)',
    transition: 'all 0.2s ease',
    boxShadow: '0 4px 15px rgba(0, 0, 0, 0.2)',
    transform: 'scale(1)',
    minHeight: 'clamp(45px, 12vw, 60px)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  };

  const numberButtonStyle = {
    ...buttonStyle,
    background: 'linear-gradient(135deg, #374151 0%, #1f2937 100%)',
    color: 'white'
  };

  const operatorButtonStyle = {
    ...buttonStyle,
    background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
    color: 'white'
  };

  const functionButtonStyle = {
    ...buttonStyle,
    background: 'linear-gradient(135deg, #6b7280 0%, #4b5563 100%)',
    color: 'white'
  };

  const backspaceButtonStyle = {
    ...buttonStyle,
    background: 'linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%)',
    color: 'white'
  };

  const hoverEffect = (e: any) => {
    e.target.style.transform = 'scale(1.05)';
  };

  const resetEffect = (e: any) => {
    e.target.style.transform = 'scale(1)';
  };

  const pressEffect = (e: any) => {
    e.target.style.transform = 'scale(0.95)';
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #2d1b69 0%, #11998e 100%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: 'clamp(10px, 3vw, 20px)',
      fontFamily: 'Arial, sans-serif'
    }}>
      <div style={{
        width: '100%',
        maxWidth: 'clamp(300px, 90vw, 400px)',
        minWidth: '280px'
      }}>
        {/* Fun Title */}
        <div style={{ textAlign: 'center', marginBottom: 'clamp(15px, 5vw, 30px)' }}>
          <h1 style={{
            fontSize: 'clamp(1.5rem, 6vw, 2.5rem)',
            fontWeight: 'bold',
            color: 'white',
            marginBottom: '10px',
            textShadow: '0 2px 10px rgba(0, 0, 0, 0.3)'
          }}>
            🧮 Math Wizard Pro
          </h1>
          <p style={{
            color: '#e0c3fc',
            fontSize: 'clamp(0.7rem, 2.5vw, 0.9rem)',
            padding: '0 10px'
          }}>
            "Making Numbers Dance Since 2025" ✨
          </p>
        </div>

        {/* Calculator */}
        <div style={{
          background: 'rgba(0, 0, 0, 0.3)',
          backdropFilter: 'blur(20px)',
          borderRadius: 'clamp(15px, 4vw, 25px)',
          padding: 'clamp(15px, 4vw, 25px)',
          boxShadow: '0 20px 40px rgba(0, 0, 0, 0.3)',
          border: '1px solid rgba(255, 255, 255, 0.1)'
        }}>

          {/* Display */}
          <div style={{
            background: 'linear-gradient(135deg, #1f2937 0%, #000000 100%)',
            borderRadius: 'clamp(10px, 3vw, 15px)',
            padding: 'clamp(15px, 4vw, 25px)',
            marginBottom: 'clamp(15px, 4vw, 20px)',
            boxShadow: 'inset 0 2px 10px rgba(0, 0, 0, 0.5)',
            minHeight: 'clamp(60px, 15vw, 80px)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center'
          }}>
            <div style={{ textAlign: 'right' }}>
              <div style={{
                color: '#9ca3af',
                fontSize: 'clamp(0.8rem, 2.5vw, 1.1rem)',
                height: 'clamp(18px, 5vw, 24px)',
                marginBottom: 'clamp(5px, 2vw, 8px)',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap'
              }}>
                {previousInput} {operator}
              </div>
              <div style={{
                color: 'white',
                fontSize: 'clamp(1.8rem, 7vw, 2.8rem)',
                fontWeight: '300',
                letterSpacing: '1px',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap'
              }}>
                {input}
              </div>
            </div>
          </div>

          {/* Buttons Grid */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: 'clamp(8px, 2vw, 12px)'
          }}>
            {/* Row 1 */}
            <button
              onClick={clearInput}
              style={{
                ...buttonStyle,
                background: 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)',
                color: 'white'
              }}
              onMouseOver={hoverEffect}
              onMouseOut={resetEffect}
              onMouseDown={pressEffect}
            >
              AC
            </button>
            <button
              onClick={backspace}
              style={backspaceButtonStyle}
              onMouseOver={hoverEffect}
              onMouseOut={resetEffect}
              onMouseDown={pressEffect}
            >
              ⌫
            </button>
            <button
              onClick={inputPercent}
              style={functionButtonStyle}
              onMouseOver={hoverEffect}
              onMouseOut={resetEffect}
              onMouseDown={pressEffect}
            >
              %
            </button>
            <button
              onClick={() => performOperation('/')}
              style={operatorButtonStyle}
              onMouseOver={hoverEffect}
              onMouseOut={resetEffect}
              onMouseDown={pressEffect}
            >
              ÷
            </button>

            {/* Row 2 */}
            <button
              onClick={() => inputDigit('7')}
              style={numberButtonStyle}
              onMouseOver={hoverEffect}
              onMouseOut={resetEffect}
              onMouseDown={pressEffect}
            >
              7
            </button>
            <button
              onClick={() => inputDigit('8')}
              style={numberButtonStyle}
              onMouseOver={hoverEffect}
              onMouseOut={resetEffect}
              onMouseDown={pressEffect}
            >
              8
            </button>
            <button
              onClick={() => inputDigit('9')}
              style={numberButtonStyle}
              onMouseOver={hoverEffect}
              onMouseOut={resetEffect}
              onMouseDown={pressEffect}
            >
              9
            </button>
            <button
              onClick={() => performOperation('*')}
              style={operatorButtonStyle}
              onMouseOver={hoverEffect}
              onMouseOut={resetEffect}
              onMouseDown={pressEffect}
            >
              ×
            </button>

            {/* Row 3 */}
            <button
              onClick={() => inputDigit('4')}
              style={numberButtonStyle}
              onMouseOver={hoverEffect}
              onMouseOut={resetEffect}
              onMouseDown={pressEffect}
            >
              4
            </button>
            <button
              onClick={() => inputDigit('5')}
              style={numberButtonStyle}
              onMouseOver={hoverEffect}
              onMouseOut={resetEffect}
              onMouseDown={pressEffect}
            >
              5
            </button>
            <button
              onClick={() => inputDigit('6')}
              style={numberButtonStyle}
              onMouseOver={hoverEffect}
              onMouseOut={resetEffect}
              onMouseDown={pressEffect}
            >
              6
            </button>
            <button
              onClick={() => performOperation('-')}
              style={operatorButtonStyle}
              onMouseOver={hoverEffect}
              onMouseOut={resetEffect}
              onMouseDown={pressEffect}
            >
              -
            </button>

            {/* Row 4 */}
            <button
              onClick={() => inputDigit('1')}
              style={numberButtonStyle}
              onMouseOver={hoverEffect}
              onMouseOut={resetEffect}
              onMouseDown={pressEffect}
            >
              1
            </button>
            <button
              onClick={() => inputDigit('2')}
              style={numberButtonStyle}
              onMouseOver={hoverEffect}
              onMouseOut={resetEffect}
              onMouseDown={pressEffect}
            >
              2
            </button>
            <button
              onClick={() => inputDigit('3')}
              style={numberButtonStyle}
              onMouseOver={hoverEffect}
              onMouseOut={resetEffect}
              onMouseDown={pressEffect}
            >
              3
            </button>
            <button
              onClick={() => performOperation('+')}
              style={operatorButtonStyle}
              onMouseOver={hoverEffect}
              onMouseOut={resetEffect}
              onMouseDown={pressEffect}
            >
              +
            </button>

            {/* Row 5 */}
            <button
              onClick={() => inputDigit('0')}
              style={{
                ...numberButtonStyle,
                gridColumn: 'span 2'
              }}
              onMouseOver={hoverEffect}
              onMouseOut={resetEffect}
              onMouseDown={pressEffect}
            >
              0
            </button>
            <button
              onClick={inputDecimal}
              style={numberButtonStyle}
              onMouseOver={hoverEffect}
              onMouseOut={resetEffect}
              onMouseDown={pressEffect}
            >
              .
            </button>
            <button
              onClick={handleEquals}
              style={{
                ...buttonStyle,
                background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                color: 'white',
                fontWeight: 'bold'
              }}
              onMouseOver={hoverEffect}
              onMouseOut={resetEffect}
              onMouseDown={pressEffect}
            >
              =
            </button>
          </div>

          <div style={{ textAlign: 'center', marginTop: 'clamp(15px, 4vw, 25px)' }}>
            <div style={{
              color: '#c084fc',
              fontSize: 'clamp(0.7rem, 2.5vw, 0.9rem)',
              fontWeight: '600',
              marginBottom: '5px'
            }}>
              ⚡ Developed by Siva ⚡
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Calculator;