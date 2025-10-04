import { TestSelection } from "../TestSelection";

export default function TestSelectionExample() {
  return (
    <TestSelection
      userName="أحمد"
      onSelectTest={(testId) => console.log("اختيار الاختبار:", testId)}
    />
  );
}
