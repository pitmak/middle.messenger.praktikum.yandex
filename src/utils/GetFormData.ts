import Block from './Block';
import Input from '../components/Input';

export default function getFormData(children: Record<string, Block | Block[]>) {
  const isAllValid = Object.values(children).reduce((acc: boolean, child) => {
    const falsy = (child instanceof Input) && (!child.isValid());
    return falsy ? false : acc;
  }, true);

  if (!isAllValid) {
    return null;
  }

  const values = Object.values(children)
    .filter((child) => (child instanceof Input) && (child.getName() !== ''))
    .map((child) => ([(child as Input).getName(), (child as Input).getValue()]));

  return Object.fromEntries(values);
}
