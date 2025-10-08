export const formatString = (format: string[], data: Record<any, any>, joinBy: string = '') => {
  return format.map((f) => data[f] || '').join(joinBy);
};
