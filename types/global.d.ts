interface Window {
  paypal?: {
    Buttons: (config: any) => { render: (selector: string) => void };
    createOrder: (data: any) => Promise<any>;
  };
}