import Block from '../../utils/Block';
import Input from '../Input';

export default class FormPage<P extends Record<string, any> = any> extends Block<P> {
  protected onSubmit() {
    const isAllValid = Object.values(this.children).reduce((acc: boolean, child: Block) => {
      const falsy = (child instanceof Input) && (!child.isValid());
      return falsy ? false : acc;
    }, true);

    if (!isAllValid) {
      console.log('Невалидиная страница');
      return;
    }

    const res = Object.values(this.children).reduce((acc: Record<string, string>, child: Block) => {
      if (child instanceof Input) {
        const inputName = child.getName();
        if (inputName !== '') {
          acc[inputName] = child.getValue();
        }
      }
      return acc;
    }, {});

    console.log('Сформирован объект: ', res);
  }
}
