const regexps: Record<string, RegExp> = {
  login: /^[a-zA-Z0-9-_]{3,20}$/,

  email: /^[-\w.]+@([A-z0-9][-A-z0-9]+\.)+[A-z]{2,4}$/,

  phone: /^(\+)?([- _():=+]?\d[- _():=+]?){10,14}$/,

  first_name: /^[А-ЯA-Z][а-яА-Яa-zA-Z-]*$/,

  second_name: /^[А-ЯA-Z][а-яА-Яa-zA-Z-]*$/,

  password: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?!.*\s).{8,40}$/,

  display_name: /^.+$/,

  message: /^.+$/,
};

export default function validateValueByName(value: string, name: string): boolean {
  const result = regexps[name].test(value);
  console.log(`validate ${name}: '${value}' => ${result}`);
  return result;
}
