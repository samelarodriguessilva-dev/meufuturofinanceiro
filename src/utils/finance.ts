
export function fvMonthly(p: number, years: number, annualRatePercent: number){
  const r = Math.pow(1 + annualRatePercent/100, 1/12) - 1
  const n = Math.round(years * 12)
  if (r === 0) return p * n
  return p * ((Math.pow(1 + r, n) - 1) / r)
}

export function monthsBetween(years: number){
  return Math.max(0, Math.round(years * 12))
}

export function inssBenefitEstimate(avgSalary:number, contributionYears:number, basePercent=60, bonusPerYear=2, baseYears=20){
  // Simplificação inspirada na regra pós-reforma: 60% + 2% por ano acima de 20 anos de contribuição
  const extraYears = Math.max(0, contributionYears - baseYears)
  let pct = basePercent + bonusPerYear * extraYears
  pct = Math.min(100, pct)
  return avgSalary * (pct/100)
}

export function severanceEstimate(params: {
  salary:number,
  companyYears:number,
  monthsInCurrentYear:number,
  hasOverdueVacation:boolean,
  type:'pedido'|'sem_justa_causa'|'com_justa_causa'
}){
  const {salary, companyYears, monthsInCurrentYear, hasOverdueVacation, type} = params
  const monthsTotal = Math.round(companyYears * 12)
  const fgtsDeposits = salary * 0.08 * monthsTotal // aproximação
  const decimoProporcional = salary * (Math.min(12, Math.max(0, monthsInCurrentYear))/12)
  const feriasProporcionais = salary * (Math.min(12, Math.max(0, monthsInCurrentYear))/12) * (4/3) // +1/3
  const feriasVencidas = hasOverdueVacation ? salary * (4/3) : 0
  const avisoPrevio = (type === 'sem_justa_causa') ? salary :  (type === 'pedido' ? 0 : 0)
  const multaFgts = (type === 'sem_justa_causa') ? fgtsDeposits * 0.40 : 0
  const total = Math.max(0, avisoPrevio + decimoProporcional + feriasProporcionais + feriasVencidas + multaFgts)
  return { avisoPrevio, decimoProporcional, feriasProporcionais, feriasVencidas, fgtsDeposits, multaFgts, total }
}
