import { tenantSubdomain } from '../tenant/tenantSubdomain';

export default class AuthCurrentTenant {

  static get() {
    let tenantASString;
    if(typeof window !== 'undefined') {
      tenantASString = localStorage.getItem('tenant') || null;
    }

    if (tenantASString) {
      return JSON.parse(tenantASString).id;
    }

    return null;
  }

  static getSettings() {
    const tenantASString =
      localStorage.getItem('tenant') || null;

    if (tenantASString) {
      const tenant = JSON.parse(tenantASString);

      if (tenant) {
        if (Array.isArray(tenant.settings)) {
          if (tenant.settings.length) {
            return tenant.settings[0];
          }
        } else {
          return tenant.settings;
        }
      }
    }

    return null;
  }

  static getMuiSettings() {
    let tenantASString = null;
    
    if(typeof window !== 'undefined'){
      tenantASString =  localStorage.getItem('tenant') || null;
    }

    if (tenantASString) {
      const tenant = JSON.parse(tenantASString);

      if (tenant) {
        if (Array.isArray(tenant.mui)) {
          if (tenant.mui.length) {
            return tenant.mui[0];
          }
        } else {
          return tenant.mui;
        }
      }
    }

    return null;
  }

  static getDefaultTaskPriority() {
    const tenantASString =
      localStorage.getItem('tenant') || null;

    if (tenantASString) {
      const tenant = JSON.parse(tenantASString);

      if (tenant) {
        if (Array.isArray(tenant.defaultTaskPriority)) {
          if (tenant.defaultTaskPriority.length) {
            return tenant.defaultTaskPriority[0];
          }
        } else {
          return tenant.defaultTaskPriority;
        }
      }
    }

    return null;
  }

  static set(tenant) {
    if (!tenant) {
      return this.clear();
    }

    localStorage.setItem('tenant', JSON.stringify(tenant));
  }

  static clear() {
    localStorage.removeItem('tenant');
  }
}
