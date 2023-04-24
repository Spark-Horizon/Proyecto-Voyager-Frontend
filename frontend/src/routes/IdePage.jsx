import { CodeInstructions } from "../components/IDE/CodeInstructions"
import { Compiler } from "../components/IDE/Compiler"

export const IdePage = () => {
  const codeId = "TC1028_21_C_10";
  return (
    <div>
      <CodeInstructions problem_id={codeId}/>
      <Compiler />
    </div>
  )
}
