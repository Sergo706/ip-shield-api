export interface LogEntry {
  timestamp: string;
  level: 'INFO' | 'Request' | 'Status' | 'ERROR' | 'WARN';
  message: string;
}
export interface ScrollAreaExpose {
  $el: HTMLElement
}