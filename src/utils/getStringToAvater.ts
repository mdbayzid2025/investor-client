import { height, width } from "@mui/system";

function stringToColor(string: string) {
  let hash = 0;
  let i;

  /* eslint-disable no-bitwise */
  for (i = 0; i < string?.length; i += 1) {
    hash = string?.charCodeAt(i) + ((hash << 5) - hash);
  }

  let color = '#';

  for (i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff;
    color += `00${value.toString(16)}`.slice(-2);
  }
  /* eslint-enable no-bitwise */

  return color;
}

export default function getStringToAvater(name: string, sx?: any) {
  const parts = name?.split(' ') ?? [];
  const firstInitial = parts[0]?.[0] ?? '';
  const secondInitial = parts[1]?.[0] ?? '';

  return {
    sx: {
      bgcolor: stringToColor(name),
      border: 3,
      borderColor: "rgba(0,0,0,0.4)",
      height: 60,
      width: 60,
      ...(sx ?? {}),
    },
    children: `${firstInitial}${secondInitial}`,
  };
}