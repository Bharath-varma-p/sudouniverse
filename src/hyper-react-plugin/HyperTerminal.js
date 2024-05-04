import React from 'react';
import { Terminal } from 'xterm';
import { FitAddon } from 'xterm-addon-fit';
import 'xterm/css/xterm.css';

class HyperTerminal extends React.Component {
  constructor(props) {
    super(props);
    this.terminalRef = React.createRef();
    this.terminal = null;
    this.fitAddon = new FitAddon();
    this.command = '';
  }

  componentDidMount() {
    this.terminal = new Terminal();
    this.terminal.loadAddon(this.fitAddon);
    this.terminal.open(this.terminalRef.current);
    this.fitAddon.fit();

    this.terminal.write('Welcome to the Sudouniverse Terminal!\r\n');
    this.terminal.write('$ ');

    this.terminal.onKey(e => {
      const printable = !e.domEvent.altKey && !e.domEvent.altGraphKey && !e.domEvent.ctrlKey && !e.domEvent.metaKey;

      if (e.domEvent.keyCode === 13) {
        this.terminal.write('\r\n');
        this.handleCommand(this.command);
        this.command = '';
      } else if (e.domEvent.keyCode === 8) {
        if (this.command.length > 0) {
          this.terminal.write('\b \b');
          this.command = this.command.slice(0, -1);
        }
      } else if (printable) {
        this.command += e.key;
        this.terminal.write(e.key);
      }
    });
  }

  handleCommand(command) {
    switch (command.trim()) {
      case 'clear':
        this.terminal.clear();
        break;
      case 'help':
        this.terminal.write('\r\nAvailable commands:\r\n');
        this.terminal.write('- clear: Clear the terminal\r\n');
        this.terminal.write('- help: Show available commands\r\n');
        break;
      default:
        if (command.trim() !== '') {
          this.terminal.write(`\r\nUnknown command: ${command}\r\n`);
        }
    }

    this.terminal.write('$ ');
  }

  render() {
    return <div ref={this.terminalRef} style={{ width: '100%', height: '400px' }} />;
  }
}

export default HyperTerminal;