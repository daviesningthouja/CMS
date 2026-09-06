import type {
  HTMLAttributes,
  TableHTMLAttributes,
  ThHTMLAttributes,
  TdHTMLAttributes,
} from "react";

type TableProps = TableHTMLAttributes<HTMLTableElement>;

type TableSectionProps = HTMLAttributes<HTMLTableSectionElement>;

type TableRowProps = HTMLAttributes<HTMLTableRowElement>;

type TableHeadProps = ThHTMLAttributes<HTMLTableCellElement>;

type TableCellProps = TdHTMLAttributes<HTMLTableCellElement>;


export function Table({
  className = "",
  ...props
}: TableProps) {
  return (
    <table
      className={`w-full text-sm ${className}`}
      {...props}
    />
  );
}


export function TableHeader({
  className = "",
  ...props
}: TableSectionProps) {
  return (
    <thead
      className={`border-b bg-muted ${className}`}
      {...props}
    />
  );
}


export function TableBody({
  className = "",
  ...props
}: TableSectionProps) {
  return (
    <tbody
      className={`divide-y ${className}`}
      {...props}
    />
  );
}


export function TableRow({
  className = "",
  ...props
}: TableRowProps) {
  return (
    <tr
      className={`hover:bg-muted/50 ${className}`}
      {...props}
    />
  );
}


export function TableHead({
  className = "",
  ...props
}: TableHeadProps) {
  return (
    <th
      className={`px-4 py-3 text-left font-medium ${className}`}
      {...props}
    />
  );
}


export function TableCell({
  className = "",
  ...props
}: TableCellProps) {
  return (
    <td
      className={`px-4 py-3 ${className}`}
      {...props}
    />
  );
}