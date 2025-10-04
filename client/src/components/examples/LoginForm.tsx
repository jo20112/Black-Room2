import { LoginForm } from "../LoginForm";

export default function LoginFormExample() {
  return (
    <LoginForm 
      onLogin={(name, age) => console.log("تسجيل دخول:", name, age)} 
    />
  );
}
