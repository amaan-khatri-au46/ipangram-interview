export const isAuthenticated = () => {
    return !!getUserDetails().payload.token;
  };

  export function generateProductImages(count:any) {
    const productImages = [];
    for (let i = 1; i <= count; i++) {
      productImages.push(`/img/products/product-${i}.jpg`);
    }
    return productImages;
  }

  export function getUserDetails() {
    const userDetailsString = localStorage.getItem('userDetails');
    
    if (userDetailsString) {
      return JSON.parse(userDetailsString);
    } else {
      return null;
    }
  }

  export function removeToken() {
    localStorage.removeItem('token');
  }

export const Roles = [
  { value: "manager", label: "manager" },
  { value: "employee", label: "employee" },
];
