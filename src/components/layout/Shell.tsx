import React from "react";
import { Link, NavLink, Outlet, useLocation, useNavigate } from "react-router-dom";
import { useTheme } from "../../lib/theme";
import {
  Menu,
  X,
  Sun,
  Moon,
  LayoutDashboard,
  Boxes,
  Tag,
  Layers,
  Truck,
  ReceiptText,
  Warehouse,
  BarChart3,
  Users,
  Settings,
  LogOut,
  Search,
  FileSearch,
  ShieldCheck,
  ChevronRight,
  Sparkles,
  Home,
  ShoppingBag,
  Package,
  TrendingUp,
  DollarSign
} from "lucide-react";

const sidebarItems = [
  { label: "Dashboard", to: "/admin", icon: LayoutDashboard },
  { label: "Products", to: "/admin/products", icon: Boxes },
  { label: "Categories", to: "/admin/categories", icon: Tag },
  { label: "Brands", to: "/admin/brands", icon: Layers },
  { label: "Models", to: "/admin/models", icon: Truck },
  { label: "Orders", to: "/admin/orders", icon: ReceiptText },
  { label: "Sales", to: "/admin/sales", icon: ShoppingBag },
  { label: "Inventory", to: "/admin/inventory", icon: Warehouse },
  { label: "Reports", to: "/admin/reports", icon: BarChart3 },
  { label: "Users", to: "/admin/users", icon: Users },
  { label: "Audit Logs", to: "/admin/audit-logs", icon: FileSearch },
  { label: "System Health", to: "/admin/system-health", icon: ShieldCheck },
  { label: "Settings", to: "/admin/settings", icon: Settings }
];

export const DashboardShell: React.FC = () => {
  const { theme, toggleTheme } = useTheme();
  const [open, setOpen] = React.useState(false);
  const [searchOpen, setSearchOpen] = React.useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  React.useEffect(() => {
    const token = window.localStorage.getItem("auth_token");
    const role = window.localStorage.getItem("user_role");
    if (!token || !["admin", "manager", "staff"].includes(role || "")) {
      navigate("/login");
    }
  }, [navigate]);

  const currentPage = React.useMemo(() => {
    const pathSegments = location.pathname.split("/").filter(Boolean);
    const currentPath = "/" + pathSegments.join("/");
    return sidebarItems.find(item => item.to === currentPath) || 
           sidebarItems.find(item => currentPath.startsWith(item.to) && item.to !== "/admin");
  }, [location.pathname]);

  const breadcrumbs = React.useMemo(() => {
    const segments = location.pathname.split("/").filter(Boolean);
    const items = [{ label: "Home", path: "/admin" }];
    
    const labels: Record<string, string> = {
      admin: "Dashboard",
      products: "Products",
      categories: "Categories",
      brands: "Brands",
      models: "Models",
      orders: "Orders",
      sales: "Sales",
      inventory: "Inventory",
      reports: "Reports",
      users: "Users",
      settings: "Settings",
      "audit-logs": "Audit Logs",
      "system-health": "System Health"
    };

    let path = "";
    segments.forEach((segment) => {
      path += `/${segment}`;
      items.push({
        label: labels[segment] || segment.charAt(0).toUpperCase() + segment.slice(1),
        path
      });
    });

    return items;
  }, [location.pathname]);

  const handleLogout = () => {
    window.localStorage.removeItem("auth_token");
    window.localStorage.removeItem("user_role");
    navigate("/");
  };

  return (
    <div className="page-shell flex min-h-screen bg-background">
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-72 border-r border-border/60 bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl transition-transform duration-300 lg:translate-x-0 ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex h-full flex-col">
          <div className="flex items-center justify-between border-b border-border/60 px-5 py-5">
            <Link to="/admin" className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-primary/80 text-white shadow-lg shadow-primary/25">
                <Sparkles className="h-5 w-5" />
              </div>
              <div>
                <div className="text-base font-bold">Speedway</div>
                <div className="text-xs text-muted-foreground">Operations Hub</div>
              </div>
            </Link>
            <button
              className="lg:hidden icon-btn"
              onClick={() => setOpen(false)}
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          <nav className="flex-1 space-y-1 overflow-y-auto p-3">
            {sidebarItems.slice(0, 9).map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.to === "/admin"}
                className={({ isActive }) =>
                  `group flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all duration-200 ${
                    isActive
                      ? "bg-primary/10 text-primary"
                      : "text-muted-foreground hover:bg-muted hover:text-foreground"
                  }`
                }
                onClick={() => setOpen(false)}
              >
                {({ isActive }) => (
                  <>
                    <item.icon className={`h-5 w-5 transition-transform duration-200 ${isActive ? 'text-primary' : 'group-hover:scale-110'}`} />
                    <span className="flex-1">{item.label}</span>
                    {isActive && (
                      <ChevronRight className="h-4 w-4 text-primary" />
                    )}
                  </>
                )}
              </NavLink>
            ))}
            
            <div className="my-3 border-t border-border/60" />
            
            {sidebarItems.slice(9).map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  `group flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all duration-200 ${
                    isActive
                      ? "bg-primary/10 text-primary"
                      : "text-muted-foreground hover:bg-muted hover:text-foreground"
                  }`
                }
                onClick={() => setOpen(false)}
              >
                {({ isActive }) => (
                  <>
                    <item.icon className={`h-5 w-5 transition-transform duration-200 ${isActive ? 'text-primary' : 'group-hover:scale-110'}`} />
                    <span className="flex-1">{item.label}</span>
                    {isActive && (
                      <ChevronRight className="h-4 w-4 text-primary" />
                    )}
                  </>
                )}
              </NavLink>
            ))}
          </nav>

          <div className="border-t border-border/60 p-3">
            <Link
              to="/"
              className="group flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-muted-foreground transition-all duration-200 hover:bg-muted hover:text-foreground"
            >
              <Home className="h-5 w-5 transition-transform duration-200 group-hover:scale-110" />
              <span className="flex-1">View Store</span>
            </Link>
          </div>
        </div>
      </aside>

      {open && (
        <div
          className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm lg:hidden"
          onClick={() => setOpen(false)}
        />
      )}

      <div className="flex-1 lg:ml-72">
        <header className="sticky top-0 z-30 border-b border-border/60 bg-white/80 backdrop-blur-xl dark:bg-slate-900/80">
          <div className="flex items-center justify-between px-4 py-3 sm:px-6">
            <div className="flex items-center gap-3">
              <button
                className="lg:hidden icon-btn"
                onClick={() => setOpen(true)}
              >
                <Menu className="h-5 w-5" />
              </button>
              
              <div className="hidden sm:flex items-center gap-2">
                <button
                  onClick={() => setSearchOpen(!searchOpen)}
                  className="flex items-center gap-2 rounded-xl border border-border bg-background px-4 py-2.5 text-sm text-muted-foreground transition-all hover:border-muted-foreground/30 hover:bg-muted/50"
                >
                  <Search className="h-4 w-4" />
                  <span>Search...</span>
                  <kbd className="ml-4 hidden rounded-md bg-muted px-1.5 py-0.5 text-xs font-medium text-muted-foreground lg:inline-block">
                    ⌘K
                  </kbd>
                </button>
              </div>

              <button
                className="sm:hidden icon-btn"
                onClick={() => setSearchOpen(!searchOpen)}
              >
                <Search className="h-5 w-5" />
              </button>
            </div>

            <div className="flex items-center gap-2">
              <button 
                className="icon-btn relative" 
                onClick={toggleTheme}
              >
                {theme === "dark" ? (
                  <Sun className="h-5 w-5" />
                ) : (
                  <Moon className="h-5 w-5" />
                )}
              </button>
              
              <button
                className="icon-btn text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20"
                onClick={handleLogout}
                title="Logout"
              >
                <LogOut className="h-5 w-5" />
              </button>
              
              <div className="ml-2 hidden sm:flex items-center gap-3 rounded-full border border-border bg-background px-3 py-1.5">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-primary to-primary/80 text-white text-sm font-semibold">
                  A
                </div>
                <div className="pr-1">
                  <div className="text-sm font-semibold">Admin</div>
                  <div className="text-[10px] text-muted-foreground">Administrator</div>
                </div>
              </div>
            </div>
          </div>

          {searchOpen && (
            <div className="border-t border-border/60 px-4 py-3 sm:px-6 animate-fade-in-down">
              <div className="mx-auto max-w-2xl">
                <div className="relative">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                  <input
                    autoFocus
                    className="w-full rounded-xl border border-border bg-background py-3 pl-12 pr-4 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
                    placeholder="Search products, orders, customers..."
                  />
                </div>
              </div>
            </div>
          )}
        </header>

        <div className="px-4 py-2 sm:px-6">
          <nav className="flex items-center gap-2 text-xs text-muted-foreground">
            {breadcrumbs.map((item, idx) => (
              <React.Fragment key={item.path}>
                {idx > 0 && <ChevronRight className="h-3 w-3" />}
                {idx === breadcrumbs.length - 1 ? (
                  <span className="font-medium text-foreground">{item.label}</span>
                ) : (
                  <Link to={item.path} className="hover:text-foreground transition-colors">
                    {item.label}
                  </Link>
                )}
              </React.Fragment>
            ))}
          </nav>
        </div>

        <main className="px-4 pb-8 sm:px-6">
          <Outlet />
        </main>
        
        <footer className="border-t border-border/60 bg-muted/30">
          <div className="mx-auto flex flex-col items-start justify-between gap-3 px-6 py-4 text-xs text-muted-foreground sm:flex-row sm:items-center">
            <div className="flex items-center gap-2">
              <span className="font-semibold">Speedway Anointed Ent</span>
              <span>•</span>
              <span>Admin Panel</span>
            </div>
            <div className="flex items-center gap-4">
              <span>© 2026 All rights reserved</span>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
};
