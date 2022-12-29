

const INTEGER_FORMATTER = new Intl.NumberFormat('es-us',{
    minimumFractionDigits: 0,
  })
export  function formatOperand(operand){
    if(operand == null) return
    const [integer, decimal] = operand.split('.')
    if(decimal == null) return INTEGER_FORMATTER.format(integer)
    return `${INTEGER_FORMATTER.format(integer)}.${decimal}`
  }