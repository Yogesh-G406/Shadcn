# RBAC System with Active Directory Integration
## Architecture & Detailed Design Document
### FMG Organization

**Document Version:** 1.0
**Date:** February 10, 2026
**Status:** Draft - Architecture Specification
**Document Type:** Technical Architecture & Detailed Design
**Prepared By:** Senior Enterprise Security Architect
**Target Audience:** Development Team, Technical Architects, Database Administrators

**Related Documents:**
- **Requirements Gathering Document** - Business and functional requirements, technology constraints

---

## Document Control

| Version | Date | Author | Changes |
|---------|------|--------|---------|
| 1.0 | 2026-02-10 | Senior Security Architect | Initial architecture and design specification |

---

## Executive Summary

This document provides the detailed technical architecture and design specifications for the FMG Centralized Pure RBAC System with Active Directory Integration. It defines:

- Complete technology stack (versions, libraries, frameworks)
- Database schema and data model
- API specifications and endpoints
- Authorization decision flows
- Integration patterns
- Component architecture
- Security architecture

This document is intended for **technical audiences** (developers, architects, DBAs) and complements the Requirements Gathering Document which focuses on business requirements.

---

## Table of Contents

1. [Technology Stack Specification](#1-technology-stack-specification)
2. [System Architecture](#2-system-architecture)
3. [Database Design](#3-database-design)
4. [API Specifications](#4-api-specifications)
5. [Authorization Architecture](#5-authorization-architecture)
6. [Pure RBAC Implementation Patterns](#6-pure-rbac-implementation-patterns)
7. [Integration Architecture](#7-integration-architecture)
8. [Security Architecture](#8-security-architecture)
9. [Deployment Architecture](#9-deployment-architecture)
10. [Performance Optimization](#10-performance-optimization)

---

## 1. Technology Stack Specification

### 1.1 Backend Technology Stack (Complete)

| Component | Technology | Version | Configuration Notes |
|-----------|-----------|---------|---------------------|
| **Programming Language** | Java | 17 LTS (OpenJDK or Oracle JDK) | Target bytecode: Java 17 |
| **Application Framework** | Spring Boot | 3.2.x | Embedded Tomcat server |
| **Security Framework** | Spring Security | 6.2.x | Form login, JWT, LDAP auth providers |
| **Data Access Layer** | Spring Data JPA | 3.2.x | Hibernate 6.4.x as JPA provider |
| **Database Driver** | PostgreSQL JDBC | 42.7.x | Connection pool via HikariCP |
| **Database Migrations** | Flyway | 9.x+ | Versioned SQL migrations |
| **Connection Pooling** | HikariCP | 5.1.x | Bundled with Spring Boot |
| **Caching** | Caffeine | 3.1.x | In-memory cache, max 10K entries per cache |
| **LDAP Integration** | Spring LDAP | 3.2.x | AD connection via LdapContextSource |
| **SAML Support** | Spring Security SAML2 | 6.2.x | RelyingPartyRegistration config |
| **OAuth Support** | Spring Security OAuth2 | 6.2.x | Resource server + authorization server |
| **API Documentation** | springdoc-openapi | 2.3.x | Generates OpenAPI 3.0 spec |
| **Logging** | SLF4J + Logback | 2.0.x / 1.4.x | JSON-structured logging |
| **Build Tool** | Maven | 3.9+ | Multi-module project structure |
| **Testing Framework** | JUnit 5 (Jupiter) | 5.10.x | @SpringBootTest for integration tests |
| **Mocking Framework** | Mockito | 5.8.x | @MockBean support |
| **Integration Testing** | Spring Boot Test | 3.2.x | @DataJpaTest, @WebMvcTest slices |
| **Bean Validation** | Hibernate Validator | 8.0.x | JSR-380 validation |

**Maven Dependencies (Key Excerpts):**
```xml
<dependencies>
    <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-web</artifactId>
        <version>3.2.2</version>
    </dependency>
    <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-security</artifactId>
        <version>3.2.2</version>
    </dependency>
    <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-data-jpa</artifactId>
        <version>3.2.2</version>
    </dependency>
    <dependency>
        <groupId>org.postgresql</groupId>
        <artifactId>postgresql</artifactId>
        <version>42.7.1</version>
    </dependency>
    <dependency>
        <groupId>org.springframework.ldap</groupId>
        <artifactId>spring-ldap-core</artifactId>
        <version>3.2.0</version>
    </dependency>
    <dependency>
        <groupId>com.github.ben-manes.caffeine</groupId>
        <artifactId>caffeine</artifactId>
        <version>3.1.8</version>
    </dependency>
    <dependency>
        <groupId>org.springdoc</groupId>
        <artifactId>springdoc-openapi-starter-webmvc-ui</artifactId>
        <version>2.3.0</version>
    </dependency>
</dependencies>
```

**Backend Runtime Configuration:**
- **JDK:** OpenJDK 17 or Oracle JDK 17 (minimum)
- **Heap Memory:** 4GB initial (-Xms4g), 8GB maximum (-Xmx8g) for production
- **Garbage Collector:** G1GC (default in Java 17)
- **CPU Cores:** 4 cores minimum, 8 cores recommended for production
- **Application Port:** 8080 (default), configurable via `server.port`

---

### 1.2 Frontend Technology Stack (Complete)

| Component | Technology | Version | Configuration Notes |
|-----------|-----------|---------|---------------------|
| **Framework** | React | 18.2.x | Functional components + hooks |
| **UI Component Library** | shadcn/ui | Latest | Installed per-component via CLI |
| **CSS Framework** | Tailwind CSS | 3.4.x | JIT mode, configured for shadcn/ui |
| **State Management (Server)** | React Query (TanStack Query) | 5.x | Data fetching, caching, synchronization |
| **State Management (Client)** | Zustand | 4.4.x | Global UI state (user preferences, theme) |
| **Routing** | React Router | 6.21.x | Nested routes, protected routes |
| **Form Handling** | React Hook Form | 7.49.x | Uncontrolled components, performance optimized |
| **Form Validation** | Zod | 3.22.x | TypeScript-first schema validation |
| **HTTP Client** | Axios | 1.6.x | Request/response interceptors for JWT |
| **Build Tool** | Vite | 5.0.x | Fast HMR, optimized production builds |
| **TypeScript** | TypeScript | 5.3.x | Strict mode enabled |
| **Testing Library** | React Testing Library | 14.1.x | User-centric component tests |
| **Test Runner** | Vitest | 1.1.x | Fast unit test execution, Vite-compatible |
| **E2E Testing** | Playwright | 1.40.x | Cross-browser testing (Chrome, Firefox, Safari) |
| **Date Handling** | date-fns | 3.0.x | Lightweight date utilities, timezone support |
| **Icons** | Lucide React | 0.303.x | Icon library optimized for shadcn/ui |
| **Linting** | ESLint | 8.56.x | React + TypeScript rules |
| **Formatting** | Prettier | 3.1.x | Code formatting |

**Package.json Dependencies (Key Excerpts):**
```json
{
  "dependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "react-router-dom": "^6.21.0",
    "@tanstack/react-query": "^5.17.0",
    "zustand": "^4.4.7",
    "react-hook-form": "^7.49.2",
    "zod": "^3.22.4",
    "axios": "^1.6.5",
    "date-fns": "^3.0.6",
    "lucide-react": "^0.303.0"
  },
  "devDependencies": {
    "@types/react": "^18.2.48",
    "@types/react-dom": "^18.2.18",
    "typescript": "^5.3.3",
    "vite": "^5.0.11",
    "vitest": "^1.1.0",
    "@playwright/test": "^1.40.1",
    "tailwindcss": "^3.4.1",
    "eslint": "^8.56.0",
    "prettier": "^3.1.1"
  }
}
```

**shadcn/ui Installation:**
```bash
npx shadcn-ui@latest init
npx shadcn-ui@latest add button input select table dialog form
# Install components as needed
```

**Frontend Runtime Configuration:**
- **Node.js:** 18.x LTS or 20.x LTS
- **Package Manager:** npm 9.x+ or pnpm 8.x+
- **Development Port:** 5173 (Vite default)
- **Production Build:** Static files served from /dist
- **Browser Support:** Chrome 100+, Firefox 100+, Edge 100+, Safari 15+

---

### 1.3 Database Technology Stack (Complete)

| Component | Technology | Version | Configuration Notes |
|-----------|-----------|---------|---------------------|
| **Database Engine** | PostgreSQL | 15.5+ | ACID compliance, JSON support, partitioning |
| **Extensions** | pg_trgm | Bundled | Full-text search, fuzzy matching |
| **Extensions** | uuid-ossp | Bundled | UUID generation functions |
| **Partitioning** | Declarative Partitioning | Built-in | Monthly partitions for audit_log table |
| **Connection Pooling** | HikariCP | 5.1.x | Via Spring Boot, 10-50 connections |
| **Backup Tool** | pg_dump / pg_basebackup | Bundled | Daily backups |
| **Monitoring** | pg_stat_statements | Bundled | Query performance monitoring |

**PostgreSQL Configuration (postgresql.conf):**
```conf
# Performance tuning
shared_buffers = 4GB                # 25% of RAM
effective_cache_size = 12GB         # 75% of RAM
maintenance_work_mem = 1GB
work_mem = 64MB
max_connections = 100

# Write-Ahead Logging (WAL)
wal_level = replica                 # For streaming replication
max_wal_senders = 3
wal_keep_size = 1GB
archive_mode = on
archive_command = 'cp %p /var/lib/postgresql/wal_archive/%f'

# Query logging
log_statement = 'mod'               # Log data modification statements
log_duration = on
log_line_prefix = '%t [%p]: [%l-1] user=%u,db=%d,app=%a,client=%h '

# Extensions
shared_preload_libraries = 'pg_stat_statements'
```

**Database Infrastructure:**
- **Storage:** 500GB initial, 1TB recommended with 7-year audit retention
- **Memory:** 16GB RAM minimum, 32GB recommended
- **IOPS:** 3000 IOPS minimum (SSD required)
- **Replication:** Streaming replication for high availability (optional)
- **Backup Schedule:** Daily full backup, continuous WAL archiving
- **Backup Retention:** 30 days online, 7 years archived (audit logs only)

---

### 1.4 shadcn/ui Component Specifications

**Core Components Required:**

| Component Category | Components | shadcn/ui Installation |
|-------------------|------------|------------------------|
| **Forms** | Form, Input, Textarea, Select, Checkbox, Radio Group, Switch, Label | `npx shadcn-ui add form input textarea select checkbox radio-group switch label` |
| **Data Display** | Table, Card, Badge, Avatar, Separator | `npx shadcn-ui add table card badge avatar separator` |
| **Feedback** | Alert, Alert Dialog, Toast, Dialog, Progress, Skeleton | `npx shadcn-ui add alert alert-dialog toast dialog progress skeleton` |
| **Navigation** | Tabs, Dropdown Menu, Command, Breadcrumb, Menubar | `npx shadcn-ui add tabs dropdown-menu command breadcrumb menubar` |
| **Layout** | Sidebar, Sheet, Scroll Area, Aspect Ratio | `npx shadcn-ui add sidebar sheet scroll-area aspect-ratio` |
| **Overlays** | Dialog, Sheet, Popover, Tooltip, Hover Card | `npx shadcn-ui add dialog sheet popover tooltip hover-card` |
| **Buttons** | Button, Toggle, Toggle Group | `npx shadcn-ui add button toggle toggle-group` |
| **Date/Time** | Calendar, Date Picker | `npx shadcn-ui add calendar date-picker` |

**shadcn/ui Configuration (components.json):**
```json
{
  "style": "default",
  "rsc": false,
  "tsx": true,
  "tailwind": {
    "config": "tailwind.config.js",
    "css": "src/index.css",
    "baseColor": "zinc",
    "cssVariables": true
  },
  "aliases": {
    "components": "@/components",
    "utils": "@/lib/utils"
  }
}
```

**Tailwind CSS Configuration (tailwind.config.js):**
```javascript
module.exports = {
  darkMode: ["class"],
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        // ... additional color variables
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}
```

**Theme Configuration (src/index.css):**
```css
@layer base {
  :root {
    --background: 0 0% 100%;
    --foreground: 240 10% 3.9%;
    --primary: 240 5.9% 10%;
    --primary-foreground: 0 0% 98%;
    /* ... */
  }

  .dark {
    --background: 240 10% 3.9%;
    --foreground: 0 0% 98%;
    --primary: 0 0% 98%;
    --primary-foreground: 240 5.9% 10%;
    /* ... */
  }
}
```

---

### 1.5 Authentication & Authorization Protocols

#### **1.5.1 LDAP/LDAPS (Active Directory)**

**Spring Security LDAP Configuration:**
```java
@Configuration
public class LdapConfig {
    @Bean
    public LdapContextSource ldapContextSource() {
        LdapContextSource contextSource = new LdapContextSource();
        contextSource.setUrl("ldaps://dc1.fmg.local:636");
        contextSource.setBase("dc=fmg,dc=local");
        contextSource.setUserDn("CN=rbac-service,OU=Service Accounts,DC=fmg,DC=local");
        contextSource.setPassword(ldapPassword);
        return contextSource;
    }

    @Bean
    public LdapTemplate ldapTemplate(LdapContextSource contextSource) {
        return new LdapTemplate(contextSource);
    }
}
```

**AD User Sync Query:**
```java
String searchFilter = "(&(objectClass=user)(!(userAccountControl:1.2.840.113556.1.4.803:=2)))";
// Excludes disabled accounts
```

---

#### **1.5.2 JWT Token Specification**

**Token Structure:**
```json
{
  "header": {
    "alg": "RS256",
    "typ": "JWT"
  },
  "payload": {
    "sub": "john.doe",
    "roles": ["ROLE_USER", "ROLE_FINANCE_MANAGER"],
    "iat": 1707566400,
    "exp": 1707568200,
    "jti": "550e8400-e29b-41d4-a716-446655440000"
  },
  "signature": "..."
}
```

**Spring Security JWT Configuration:**
```java
@Configuration
@EnableWebSecurity
public class JwtSecurityConfig {

    @Bean
    public JwtDecoder jwtDecoder() {
        return NimbusJwtDecoder.withPublicKey(rsaPublicKey()).build();
    }

    @Bean
    public JwtEncoder jwtEncoder() {
        JWK jwk = new RSAKey.Builder(rsaPublicKey())
            .privateKey(rsaPrivateKey())
            .build();
        JWKSource<SecurityContext> jwks = new ImmutableJWKSet<>(new JWKSet(jwk));
        return new NimbusJwtEncoder(jwks);
    }
}
```

**Token Lifecycle:**
- **Access Token Expiration:** 30 minutes
- **Refresh Token Expiration:** 7 days
- **Refresh Token Storage:** PostgreSQL `refresh_tokens` table
- **Token Revocation:** Blacklist in Caffeine cache (30-min TTL)

---

### 1.6 Caching Strategy (Caffeine)

**Cache Configuration (application.yml):**
```yaml
spring:
  cache:
    type: caffeine
    caffeine:
      spec: maximumSize=10000,expireAfterWrite=5m
    cache-names:
      - roleCache
      - permissionCache
      - userCache
      - tokenBlacklist
```

**Java Configuration:**
```java
@Configuration
@EnableCaching
public class CacheConfig {

    @Bean
    public CaffeineCache roleCache() {
        return new CaffeineCache("roleCache",
            Caffeine.newBuilder()
                .maximumSize(10000)
                .expireAfterWrite(5, TimeUnit.MINUTES)
                .recordStats()
                .build());
    }

    @Bean
    public CaffeineCache permissionCache() {
        return new CaffeineCache("permissionCache",
            Caffeine.newBuilder()
                .maximumSize(10000)
                .expireAfterWrite(5, TimeUnit.MINUTES)
                .recordStats()
                .build());
    }
}
```

**Cache Usage Pattern:**
```java
@Cacheable(value = "roleCache", key = "#username")
public List<Role> getUserRoles(String username) {
    // Query database for user's roles
    return roleRepository.findByUsername(username);
}

@CacheEvict(value = "roleCache", key = "#username")
public void evictUserRoleCache(String username) {
    // Evict cache when roles change
}
```

---

## 2. System Architecture

### 2.1 High-Level Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                    CLIENT TIER                               │
├─────────────────────────────────────────────────────────────┤
│  React SPA (shadcn/ui)                                       │
│  - User Portal                                               │
│  - Admin Portal                                              │
│  - Manager Portal                                            │
└───────────────────┬─────────────────────────────────────────┘
                    │ HTTPS/REST + JWT
                    ▼
┌─────────────────────────────────────────────────────────────┐
│                  APPLICATION TIER                            │
├─────────────────────────────────────────────────────────────┤
│  Spring Boot Application Server                              │
│  ┌──────────────────────────────────────────────────────┐  │
│  │  Spring Security (Authentication & Authorization)     │  │
│  ├──────────────────────────────────────────────────────┤  │
│  │  REST Controllers (API Layer)                         │  │
│  ├──────────────────────────────────────────────────────┤  │
│  │  Service Layer (Business Logic)                       │  │
│  │  - User Management Service                            │  │
│  │  - Role Management Service                            │  │
│  │  - Authorization Service                              │  │
│  │  - AD Sync Service                                    │  │
│  ├──────────────────────────────────────────────────────┤  │
│  │  Data Access Layer (Spring Data JPA)                  │  │
│  └──────────────────────────────────────────────────────┘  │
│  ┌──────────────────────────────────────────────────────┐  │
│  │  Caffeine Cache (In-Memory)                           │  │
│  └──────────────────────────────────────────────────────┘  │
└───────────┬──────────────────────────┬──────────────────────┘
            │ LDAPS                    │ JDBC
            ▼                          ▼
┌─────────────────────┐  ┌─────────────────────────────────┐
│  IDENTITY TIER      │  │      DATA TIER                  │
├─────────────────────┤  ├─────────────────────────────────┤
│  Active Directory   │  │  PostgreSQL Database            │
│  (Read-Only)        │  │  - RBAC Tables                  │
│  - Users            │  │  - Audit Logs (Partitioned)     │
│  - Groups           │  │  - Refresh Tokens               │
└─────────────────────┘  └─────────────────────────────────┘
```

---

## 3. Database Design

### 3.1 Entity-Relationship Diagram

```
┌─────────────┐           ┌────────────────────────┐           ┌──────────────┐
│   users     │           │ user_role_assignments  │           │    roles     │
├─────────────┤           ├────────────────────────┤           ├──────────────┤
│ user_id PK  │◄─────────┤ user_id FK             │──────────►│ role_id PK   │
│ ad_guid     │          │ role_id FK             │           │ role_name    │
│ username    │          │ expires_at             │           │ parent_role  │
│ email       │          │ is_active              │           │ description  │
└─────────────┘          └────────────────────────┘           └───────┬──────┘
                                                                       │
                                                                       ▼
                                                          ┌────────────────────┐
                                                          │ role_permissions   │
                                                          ├────────────────────┤
                                                          │ role_id FK         │
                                                          │ permission_id FK   │
                                                          └──────────┬─────────┘
                                                                     │
                                                                     ▼
                                                          ┌──────────────────┐
                                                          │  permissions     │
                                                          ├──────────────────┤
                                                          │ permission_id PK │
                                                          │ permission_name  │
                                                          │ action           │
                                                          │ resource_type    │
                                                          └──────────────────┘
```

---

### 3.2 Complete Database Schema

```sql
-- ============================================
-- USERS TABLE
-- ============================================
CREATE TABLE users (
    user_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    ad_guid UUID UNIQUE NOT NULL,  -- Active Directory GUID
    username VARCHAR(255) UNIQUE NOT NULL,
    email VARCHAR(255),
    first_name VARCHAR(100),
    last_name VARCHAR(100),
    department VARCHAR(100),
    title VARCHAR(100),
    manager_id UUID,  -- Self-referencing FK
    status VARCHAR(20) NOT NULL DEFAULT 'active',  -- active, suspended, terminated
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    last_sync_at TIMESTAMP WITH TIME ZONE,  -- Last AD sync timestamp
    deleted_at TIMESTAMP WITH TIME ZONE,  -- Soft delete
    CONSTRAINT fk_manager FOREIGN KEY (manager_id) REFERENCES users(user_id),
    CONSTRAINT chk_status CHECK (status IN ('active', 'suspended', 'terminated'))
);

CREATE INDEX idx_users_ad_guid ON users(ad_guid);
CREATE INDEX idx_users_username ON users(username);
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_status ON users(status);
CREATE INDEX idx_users_manager ON users(manager_id);

-- ============================================
-- ROLES TABLE
-- ============================================
CREATE TABLE roles (
    role_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    role_name VARCHAR(255) UNIQUE NOT NULL,
    description TEXT,
    role_type VARCHAR(50) NOT NULL,  -- functional, organizational, project, technical
    parent_role_id UUID,  -- For role hierarchy
    is_privileged BOOLEAN DEFAULT FALSE,  -- Privileged role flag
    requires_approval BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    created_by UUID,
    deleted_at TIMESTAMP WITH TIME ZONE,  -- Soft delete
    CONSTRAINT fk_parent_role FOREIGN KEY (parent_role_id) REFERENCES roles(role_id),
    CONSTRAINT fk_created_by FOREIGN KEY (created_by) REFERENCES users(user_id),
    CONSTRAINT chk_role_type CHECK (role_type IN ('functional', 'organizational', 'project', 'technical'))
);

CREATE INDEX idx_roles_name ON roles(role_name);
CREATE INDEX idx_roles_parent ON roles(parent_role_id);
CREATE INDEX idx_roles_type ON roles(role_type);
CREATE INDEX idx_roles_privileged ON roles(is_privileged);

-- ============================================
-- PERMISSIONS TABLE
-- ============================================
CREATE TABLE permissions (
    permission_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    permission_name VARCHAR(255) UNIQUE NOT NULL,
    description TEXT,
    resource_type VARCHAR(100) NOT NULL,  -- application, module, function, data
    action VARCHAR(50) NOT NULL,  -- create, read, update, delete, execute, approve, admin, deny
    classification_level VARCHAR(20),  -- public, internal, confidential, restricted
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    created_by UUID,
    deleted_at TIMESTAMP WITH TIME ZONE,  -- Soft delete
    CONSTRAINT fk_permission_created_by FOREIGN KEY (created_by) REFERENCES users(user_id),
    CONSTRAINT chk_action CHECK (action IN ('create', 'read', 'update', 'delete', 'execute', 'approve', 'admin', 'deny'))
);

CREATE INDEX idx_permissions_name ON permissions(permission_name);
CREATE INDEX idx_permissions_resource_type ON permissions(resource_type);
CREATE INDEX idx_permissions_action ON permissions(action);
CREATE INDEX idx_permissions_classification ON permissions(classification_level);

-- ============================================
-- RESOURCES TABLE
-- ============================================
CREATE TABLE resources (
    resource_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    resource_name VARCHAR(255) UNIQUE NOT NULL,
    resource_type VARCHAR(100) NOT NULL,  -- application, api, database, file_system
    classification VARCHAR(20) NOT NULL,  -- public, internal, confidential, restricted
    owner_id UUID,
    description TEXT,
    metadata JSONB,  -- Flexible metadata storage
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    deleted_at TIMESTAMP WITH TIME ZONE,  -- Soft delete
    CONSTRAINT fk_resource_owner FOREIGN KEY (owner_id) REFERENCES users(user_id)
);

CREATE INDEX idx_resources_name ON resources(resource_name);
CREATE INDEX idx_resources_type ON resources(resource_type);
CREATE INDEX idx_resources_classification ON resources(classification);
CREATE INDEX idx_resources_metadata ON resources USING GIN(metadata);

-- ============================================
-- USER-ROLE ASSIGNMENTS (Many-to-Many)
-- ============================================
CREATE TABLE user_role_assignments (
    assignment_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL,
    role_id UUID NOT NULL,
    assigned_by UUID,
    assigned_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    expires_at TIMESTAMP WITH TIME ZONE,  -- Temporal role assignment (optional)
    justification TEXT,
    is_active BOOLEAN DEFAULT TRUE,
    revoked_at TIMESTAMP WITH TIME ZONE,
    revoked_by UUID,
    revocation_reason TEXT,
    CONSTRAINT fk_ura_user FOREIGN KEY (user_id) REFERENCES users(user_id),
    CONSTRAINT fk_ura_role FOREIGN KEY (role_id) REFERENCES roles(role_id),
    CONSTRAINT fk_ura_assigned_by FOREIGN KEY (assigned_by) REFERENCES users(user_id),
    CONSTRAINT fk_ura_revoked_by FOREIGN KEY (revoked_by) REFERENCES users(user_id),
    CONSTRAINT uq_user_role_active UNIQUE (user_id, role_id, is_active)
);

CREATE INDEX idx_ura_user ON user_role_assignments(user_id);
CREATE INDEX idx_ura_role ON user_role_assignments(role_id);
CREATE INDEX idx_ura_expires ON user_role_assignments(expires_at);
CREATE INDEX idx_ura_active ON user_role_assignments(is_active);
CREATE INDEX idx_ura_user_role ON user_role_assignments(user_id, role_id);

-- ============================================
-- ROLE-PERMISSION MAPPINGS (Many-to-Many)
-- ============================================
CREATE TABLE role_permissions (
    role_permission_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    role_id UUID NOT NULL,
    permission_id UUID NOT NULL,
    granted_by UUID,
    granted_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    is_active BOOLEAN DEFAULT TRUE,
    CONSTRAINT fk_rp_role FOREIGN KEY (role_id) REFERENCES roles(role_id),
    CONSTRAINT fk_rp_permission FOREIGN KEY (permission_id) REFERENCES permissions(permission_id),
    CONSTRAINT fk_rp_granted_by FOREIGN KEY (granted_by) REFERENCES users(user_id),
    CONSTRAINT uq_role_permission UNIQUE (role_id, permission_id)
);

CREATE INDEX idx_rp_role ON role_permissions(role_id);
CREATE INDEX idx_rp_permission ON role_permissions(permission_id);

-- ============================================
-- PERMISSION-RESOURCE MAPPINGS (Many-to-Many)
-- ============================================
CREATE TABLE permission_resources (
    permission_resource_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    permission_id UUID NOT NULL,
    resource_id UUID NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_pr_permission FOREIGN KEY (permission_id) REFERENCES permissions(permission_id),
    CONSTRAINT fk_pr_resource FOREIGN KEY (resource_id) REFERENCES resources(resource_id),
    CONSTRAINT uq_permission_resource UNIQUE (permission_id, resource_id)
);

CREATE INDEX idx_pr_permission ON permission_resources(permission_id);
CREATE INDEX idx_pr_resource ON permission_resources(resource_id);

-- ============================================
-- SEGREGATION OF DUTIES (SoD) RULES
-- ============================================
CREATE TABLE sod_rules (
    sod_rule_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    rule_name VARCHAR(255) UNIQUE NOT NULL,
    description TEXT,
    role1_id UUID NOT NULL,
    role2_id UUID NOT NULL,
    severity VARCHAR(20) NOT NULL,  -- critical, high, medium
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    created_by UUID,
    CONSTRAINT fk_sod_role1 FOREIGN KEY (role1_id) REFERENCES roles(role_id),
    CONSTRAINT fk_sod_role2 FOREIGN KEY (role2_id) REFERENCES roles(role_id),
    CONSTRAINT fk_sod_created_by FOREIGN KEY (created_by) REFERENCES users(user_id),
    CONSTRAINT chk_sod_severity CHECK (severity IN ('critical', 'high', 'medium'))
);

CREATE INDEX idx_sod_role1 ON sod_rules(role1_id);
CREATE INDEX idx_sod_role2 ON sod_rules(role2_id);

-- ============================================
-- AUDIT LOG (Partitioned by Month)
-- ============================================
CREATE TABLE audit_log (
    audit_id BIGSERIAL,
    event_type VARCHAR(100) NOT NULL,  -- authentication, authorization, role_change, permission_change
    user_id UUID,
    target_user_id UUID,  -- For user management events
    role_id UUID,
    permission_id UUID,
    resource_id UUID,
    action VARCHAR(100),
    result VARCHAR(20) NOT NULL,  -- success, failure, denied
    ip_address INET,
    user_agent TEXT,
    session_id VARCHAR(255),
    details JSONB,  -- Flexible event details
    timestamp TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP NOT NULL,
    PRIMARY KEY (audit_id, timestamp)
) PARTITION BY RANGE (timestamp);

-- Create monthly partitions (example for 2026)
CREATE TABLE audit_log_2026_01 PARTITION OF audit_log FOR VALUES FROM ('2026-01-01') TO ('2026-02-01');
CREATE TABLE audit_log_2026_02 PARTITION OF audit_log FOR VALUES FROM ('2026-02-01') TO ('2026-03-01');
CREATE TABLE audit_log_2026_03 PARTITION OF audit_log FOR VALUES FROM ('2026-03-01') TO ('2026-04-01');
CREATE TABLE audit_log_2026_04 PARTITION OF audit_log FOR VALUES FROM ('2026-04-01') TO ('2026-05-01');
CREATE TABLE audit_log_2026_05 PARTITION OF audit_log FOR VALUES FROM ('2026-05-01') TO ('2026-06-01');
CREATE TABLE audit_log_2026_06 PARTITION OF audit_log FOR VALUES FROM ('2026-06-01') TO ('2026-07-01');
CREATE TABLE audit_log_2026_07 PARTITION OF audit_log FOR VALUES FROM ('2026-07-01') TO ('2026-08-01');
CREATE TABLE audit_log_2026_08 PARTITION OF audit_log FOR VALUES FROM ('2026-08-01') TO ('2026-09-01');
CREATE TABLE audit_log_2026_09 PARTITION OF audit_log FOR VALUES FROM ('2026-09-01') TO ('2026-10-01');
CREATE TABLE audit_log_2026_10 PARTITION OF audit_log FOR VALUES FROM ('2026-10-01') TO ('2026-11-01');
CREATE TABLE audit_log_2026_11 PARTITION OF audit_log FOR VALUES FROM ('2026-11-01') TO ('2026-12-01');
CREATE TABLE audit_log_2026_12 PARTITION OF audit_log FOR VALUES FROM ('2026-12-01') TO ('2027-01-01');

-- Automated partition creation script (scheduled monthly)
-- CREATE TABLE audit_log_YYYY_MM PARTITION OF audit_log FOR VALUES FROM ('YYYY-MM-01') TO ('YYYY-MM+1-01');

CREATE INDEX idx_audit_timestamp ON audit_log(timestamp DESC);
CREATE INDEX idx_audit_user ON audit_log(user_id, timestamp);
CREATE INDEX idx_audit_event_type ON audit_log(event_type, timestamp);
CREATE INDEX idx_audit_result ON audit_log(result);
CREATE INDEX idx_audit_details ON audit_log USING GIN(details);

-- ============================================
-- ROLE CHANGE HISTORY
-- ============================================
CREATE TABLE role_change_history (
    history_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    role_id UUID NOT NULL,
    change_type VARCHAR(50) NOT NULL,  -- created, updated, deleted, permission_added, permission_removed
    changed_by UUID,
    changed_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    before_state JSONB,
    after_state JSONB,
    change_reason TEXT,
    CONSTRAINT fk_rch_role FOREIGN KEY (role_id) REFERENCES roles(role_id),
    CONSTRAINT fk_rch_changed_by FOREIGN KEY (changed_by) REFERENCES users(user_id)
);

CREATE INDEX idx_rch_role ON role_change_history(role_id, changed_at);
CREATE INDEX idx_rch_timestamp ON role_change_history(changed_at DESC);

-- ============================================
-- JWT REFRESH TOKENS
-- ============================================
CREATE TABLE refresh_tokens (
    token_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL,
    token_hash VARCHAR(255) UNIQUE NOT NULL,  -- SHA-256 hash of refresh token
    issued_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    expires_at TIMESTAMP WITH TIME ZONE NOT NULL,
    used_at TIMESTAMP WITH TIME ZONE,  -- One-time use tracking
    revoked_at TIMESTAMP WITH TIME ZONE,
    ip_address INET,
    user_agent TEXT,
    CONSTRAINT fk_rt_user FOREIGN KEY (user_id) REFERENCES users(user_id)
);

CREATE INDEX idx_rt_user ON refresh_tokens(user_id);
CREATE INDEX idx_rt_token_hash ON refresh_tokens(token_hash);
CREATE INDEX idx_rt_expires ON refresh_tokens(expires_at);

-- ============================================
-- ACCESS REQUESTS (Workflow)
-- ============================================
CREATE TABLE access_requests (
    request_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    requester_id UUID NOT NULL,
    target_user_id UUID NOT NULL,  -- User receiving access
    role_id UUID NOT NULL,
    request_type VARCHAR(50) NOT NULL,  -- new_access, temporary_access, emergency_access
    business_justification TEXT NOT NULL,
    requested_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    expires_at TIMESTAMP WITH TIME ZONE,  -- For temporary access
    status VARCHAR(50) NOT NULL DEFAULT 'pending',  -- pending, approved, rejected, expired
    approved_by UUID,
    approved_at TIMESTAMP WITH TIME ZONE,
    approval_comment TEXT,
    rejected_by UUID,
    rejected_at TIMESTAMP WITH TIME ZONE,
    rejection_reason TEXT,
    provisioned_at TIMESTAMP WITH TIME ZONE,
    CONSTRAINT fk_ar_requester FOREIGN KEY (requester_id) REFERENCES users(user_id),
    CONSTRAINT fk_ar_target_user FOREIGN KEY (target_user_id) REFERENCES users(user_id),
    CONSTRAINT fk_ar_role FOREIGN KEY (role_id) REFERENCES roles(role_id),
    CONSTRAINT fk_ar_approved_by FOREIGN KEY (approved_by) REFERENCES users(user_id),
    CONSTRAINT fk_ar_rejected_by FOREIGN KEY (rejected_by) REFERENCES users(user_id),
    CONSTRAINT chk_ar_status CHECK (status IN ('pending', 'approved', 'rejected', 'expired', 'provisioned'))
);

CREATE INDEX idx_ar_requester ON access_requests(requester_id);
CREATE INDEX idx_ar_status ON access_requests(status);
CREATE INDEX idx_ar_requested_at ON access_requests(requested_at DESC);

-- ============================================
-- AD SYNCHRONIZATION LOG
-- ============================================
CREATE TABLE ad_sync_log (
    sync_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    sync_type VARCHAR(20) NOT NULL,  -- full, delta
    started_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    completed_at TIMESTAMP WITH TIME ZONE,
    status VARCHAR(20) NOT NULL,  -- in_progress, success, failed
    users_synced INTEGER DEFAULT 0,
    groups_synced INTEGER DEFAULT 0,
    errors INTEGER DEFAULT 0,
    error_details JSONB,
    CONSTRAINT chk_sync_type CHECK (sync_type IN ('full', 'delta')),
    CONSTRAINT chk_sync_status CHECK (status IN ('in_progress', 'success', 'failed'))
);

CREATE INDEX idx_ad_sync_started ON ad_sync_log(started_at DESC);
```

**Database Constraints & Integrity:**
- All foreign keys enforce referential integrity
- Soft deletes (`deleted_at`) preserve audit trail
- UUID primary keys for distributed system compatibility
- Check constraints enforce valid enum values
- Unique constraints prevent duplicate assignments
- Indexes optimize query performance for authorization decisions (<200ms SLA)

**Partitioning Strategy:**
- Audit log partitioned by month (7-year retention = 84 partitions)
- Old partitions archived to cold storage after 1 year
- Automatic partition creation via scheduled job (monthly cron)

**Backup & Recovery:**
- Daily full backup via `pg_basebackup`
- Continuous WAL archiving for point-in-time recovery (PITR)
- RPO: 24 hours, RTO: 4 hours
- Test restore procedure: Quarterly

---

## 4. API Specifications

### 4.1 API Base Configuration

**Base URL:** `https://rbac.fmg.local/api/v1`

**Authentication:** JWT Bearer Token in `Authorization` header
```
Authorization: Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9...
```

**Response Format:** JSON

**Standard Error Format:**
```json
{
  "error": {
    "code": "UNAUTHORIZED",
    "message": "Invalid or expired token",
    "timestamp": "2026-02-10T10:30:00Z",
    "path": "/api/v1/roles"
  }
}
```

**HTTP Status Codes:**
- `200 OK` - Successful GET request
- `201 Created` - Successful POST request
- `204 No Content` - Successful DELETE request
- `400 Bad Request` - Invalid input
- `401 Unauthorized` - Missing or invalid JWT
- `403 Forbidden` - User lacks required permission
- `404 Not Found` - Resource not found
- `500 Internal Server Error` - Server error

---

### 4.2 Authentication APIs

#### **POST /auth/login**
Authenticate user via Active Directory

**Request:**
```json
{
  "username": "john.doe",
  "password": "SecureP@ssw0rd"
}
```

**Response (200):**
```json
{
  "accessToken": "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9...",
  "refreshToken": "550e8400-e29b-41d4-a716-446655440000",
  "expiresIn": 1800,
  "tokenType": "Bearer",
  "user": {
    "userId": "123e4567-e89b-12d3-a456-426614174000",
    "username": "john.doe",
    "email": "john.doe@fmg.local",
    "roles": ["ROLE_USER", "ROLE_FINANCE_MANAGER"]
  }
}
```

**Response (401 - Invalid Credentials):**
```json
{
  "error": {
    "code": "INVALID_CREDENTIALS",
    "message": "Invalid username or password",
    "timestamp": "2026-02-10T10:30:00Z"
  }
}
```

---

#### **POST /auth/refresh**
Refresh access token using refresh token

**Request:**
```json
{
  "refreshToken": "550e8400-e29b-41d4-a716-446655440000"
}
```

**Response (200):**
```json
{
  "accessToken": "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9...",
  "refreshToken": "660e9500-f30c-52e5-b827-557766551111",
  "expiresIn": 1800,
  "tokenType": "Bearer"
}
```

---

#### **POST /auth/logout**
Revoke refresh token and add JWT to blacklist

**Request:**
```json
{
  "refreshToken": "550e8400-e29b-41d4-a716-446655440000"
}
```

**Response (200):**
```json
{
  "success": true,
  "message": "Logged out successfully"
}
```

---

#### **GET /auth/me**
Get current authenticated user profile

**Headers:**
```
Authorization: Bearer <JWT>
```

**Response (200):**
```json
{
  "userId": "123e4567-e89b-12d3-a456-426614174000",
  "username": "john.doe",
  "email": "john.doe@fmg.local",
  "firstName": "John",
  "lastName": "Doe",
  "department": "Finance",
  "title": "Finance Manager",
  "roles": [
    {
      "roleId": "role-uuid-1",
      "roleName": "ROLE_USER",
      "assignedAt": "2026-01-01T00:00:00Z"
    },
    {
      "roleId": "role-uuid-2",
      "roleName": "ROLE_FINANCE_MANAGER",
      "assignedAt": "2026-01-15T00:00:00Z",
      "expiresAt": null
    }
  ],
  "permissions": [
    "READ_FINANCE_DATA",
    "APPROVE_EXPENSE_REPORTS",
    "MANAGE_TEAM_ACCESS"
  ]
}
```

---

### 4.3 Authorization APIs

#### **POST /authz/check**
Check if user has permission for action on resource

**Request:**
```json
{
  "userId": "123e4567-e89b-12d3-a456-426614174000",
  "resource": "finance_reports",
  "action": "read"
}
```

**Response (200 - Allowed):**
```json
{
  "allowed": true,
  "reason": "User has ROLE_FINANCE_MANAGER with READ_FINANCE_DATA permission"
}
```

**Response (200 - Denied):**
```json
{
  "allowed": false,
  "reason": "User lacks required permission READ_FINANCE_DATA"
}
```

---

#### **GET /authz/user/{userId}/roles**
Get all roles assigned to a user

**Response (200):**
```json
{
  "userId": "123e4567-e89b-12d3-a456-426614174000",
  "roles": [
    {
      "roleId": "role-uuid-1",
      "roleName": "ROLE_USER",
      "roleType": "functional",
      "assignedBy": "admin-user-uuid",
      "assignedAt": "2026-01-01T00:00:00Z",
      "expiresAt": null,
      "isActive": true
    },
    {
      "roleId": "role-uuid-2",
      "roleName": "ROLE_FINANCE_MANAGER",
      "roleType": "organizational",
      "assignedBy": "hr-admin-uuid",
      "assignedAt": "2026-01-15T00:00:00Z",
      "expiresAt": "2026-12-31T23:59:59Z",
      "isActive": true
    }
  ]
}
```

---

#### **GET /authz/user/{userId}/permissions**
Get user's effective permissions (from all roles)

**Response (200):**
```json
{
  "userId": "123e4567-e89b-12d3-a456-426614174000",
  "permissions": [
    {
      "permissionId": "perm-uuid-1",
      "permissionName": "READ_FINANCE_DATA",
      "action": "read",
      "resourceType": "application",
      "grantedByRole": "ROLE_FINANCE_MANAGER"
    },
    {
      "permissionId": "perm-uuid-2",
      "permissionName": "APPROVE_EXPENSE_REPORTS",
      "action": "approve",
      "resourceType": "function",
      "grantedByRole": "ROLE_FINANCE_MANAGER"
    }
  ]
}
```

---

### 4.4 Role Management APIs

#### **GET /roles**
List all roles (paginated)

**Query Parameters:**
- `type` (optional): Filter by role type (`functional`, `organizational`, `project`, `technical`)
- `page` (default: 0): Page number (0-indexed)
- `size` (default: 20): Page size (max 100)
- `sort` (default: `roleName,asc`): Sort field and direction

**Request:**
```
GET /api/v1/roles?type=functional&page=0&size=20&sort=roleName,asc
```

**Response (200):**
```json
{
  "content": [
    {
      "roleId": "role-uuid-1",
      "roleName": "ROLE_USER",
      "description": "Standard user role",
      "roleType": "functional",
      "parentRoleId": null,
      "isPrivileged": false,
      "requiresApproval": false,
      "createdAt": "2026-01-01T00:00:00Z",
      "permissionCount": 15
    }
  ],
  "pageable": {
    "pageNumber": 0,
    "pageSize": 20,
    "sort": {
      "sorted": true,
      "unsorted": false
    }
  },
  "totalElements": 45,
  "totalPages": 3,
  "last": false
}
```

---

#### **GET /roles/{roleId}**
Get role details with permissions

**Response (200):**
```json
{
  "roleId": "role-uuid-1",
  "roleName": "ROLE_FINANCE_MANAGER",
  "description": "Finance department manager role",
  "roleType": "organizational",
  "parentRoleId": "parent-role-uuid",
  "isPrivileged": false,
  "requiresApproval": true,
  "permissions": [
    {
      "permissionId": "perm-uuid-1",
      "permissionName": "READ_FINANCE_DATA",
      "action": "read",
      "resourceType": "application",
      "grantedAt": "2026-01-01T00:00:00Z"
    }
  ],
  "userCount": 12,
  "createdAt": "2026-01-01T00:00:00Z",
  "updatedAt": "2026-02-01T00:00:00Z"
}
```

---

#### **POST /roles**
Create new role

**Request:**
```json
{
  "roleName": "ROLE_CONTRACTOR",
  "description": "Contractor access role",
  "roleType": "functional",
  "parentRoleId": "role-employee-uuid",
  "requiresApproval": true,
  "permissions": [
    "perm-uuid-1",
    "perm-uuid-2"
  ]
}
```

**Response (201):**
```json
{
  "roleId": "new-role-uuid",
  "roleName": "ROLE_CONTRACTOR",
  "message": "Role created successfully"
}
```

---

#### **PUT /roles/{roleId}**
Update role

**Request:**
```json
{
  "description": "Updated description",
  "requiresApproval": false
}
```

**Response (200):**
```json
{
  "roleId": "role-uuid",
  "message": "Role updated successfully"
}
```

---

#### **DELETE /roles/{roleId}**
Soft delete role

**Response (204 No Content)**

---

#### **POST /roles/{roleId}/permissions**
Add permissions to role

**Request:**
```json
{
  "permissionIds": [
    "perm-uuid-3",
    "perm-uuid-4"
  ]
}
```

**Response (200):**
```json
{
  "roleId": "role-uuid",
  "permissionsAdded": 2,
  "message": "Permissions added successfully"
}
```

---

#### **DELETE /roles/{roleId}/permissions/{permissionId}**
Remove permission from role

**Response (204 No Content)**

---

### 4.5 User Management APIs

#### **GET /users**
List users (paginated)

**Query Parameters:**
- `status` (optional): Filter by status (`active`, `suspended`, `terminated`)
- `department` (optional): Filter by department
- `page`, `size`, `sort`: Standard pagination

**Response (200):**
```json
{
  "content": [
    {
      "userId": "user-uuid-1",
      "username": "john.doe",
      "email": "john.doe@fmg.local",
      "firstName": "John",
      "lastName": "Doe",
      "department": "Finance",
      "title": "Finance Manager",
      "status": "active",
      "roleCount": 2
    }
  ],
  "totalElements": 5000,
  "totalPages": 250,
  "pageable": {
    "pageNumber": 0,
    "pageSize": 20
  }
}
```

---

#### **GET /users/{userId}**
Get user details with roles

**Response (200):**
```json
{
  "userId": "user-uuid-1",
  "username": "john.doe",
  "email": "john.doe@fmg.local",
  "firstName": "John",
  "lastName": "Doe",
  "department": "Finance",
  "title": "Finance Manager",
  "managerId": "manager-uuid",
  "status": "active",
  "roles": [
    {
      "roleId": "role-uuid-1",
      "roleName": "ROLE_FINANCE_MANAGER",
      "assignedAt": "2026-01-15T00:00:00Z",
      "expiresAt": null,
      "assignedBy": "admin-uuid"
    }
  ],
  "createdAt": "2025-01-01T00:00:00Z",
  "lastSyncAt": "2026-02-10T08:00:00Z"
}
```

---

#### **POST /users/{userId}/roles**
Assign role to user

**Request:**
```json
{
  "roleId": "role-uuid-1",
  "expiresAt": "2026-12-31T23:59:59Z",
  "justification": "Temporary project access"
}
```

**Response (201):**
```json
{
  "assignmentId": "assignment-uuid",
  "userId": "user-uuid-1",
  "roleId": "role-uuid-1",
  "assignedAt": "2026-02-10T10:30:00Z",
  "message": "Role assigned successfully"
}
```

**Response (409 - SoD Conflict):**
```json
{
  "error": {
    "code": "SOD_VIOLATION",
    "message": "Assigning this role would violate Segregation of Duties rule: Approver and Requestor cannot be the same person",
    "conflictingRoles": ["ROLE_APPROVER", "ROLE_REQUESTOR"]
  }
}
```

---

#### **DELETE /users/{userId}/roles/{roleId}**
Revoke role from user

**Request:**
```json
{
  "reason": "User transferred to different department"
}
```

**Response (200):**
```json
{
  "userId": "user-uuid-1",
  "roleId": "role-uuid-1",
  "revokedAt": "2026-02-10T10:30:00Z",
  "message": "Role revoked successfully"
}
```

---

#### **GET /users/{userId}/access-history**
Get user access history (audit log)

**Query Parameters:**
- `from` (optional): Start date (ISO 8601)
- `to` (optional): End date (ISO 8601)
- `eventType` (optional): Filter by event type

**Response (200):**
```json
{
  "userId": "user-uuid-1",
  "accessHistory": [
    {
      "auditId": "audit-uuid-1",
      "eventType": "authentication",
      "action": "login",
      "result": "success",
      "ipAddress": "192.168.1.100",
      "userAgent": "Mozilla/5.0...",
      "timestamp": "2026-02-10T10:30:00Z"
    },
    {
      "auditId": "audit-uuid-2",
      "eventType": "authorization",
      "action": "read_finance_report",
      "result": "success",
      "resourceId": "report-uuid-1",
      "timestamp": "2026-02-10T10:35:00Z"
    }
  ],
  "totalElements": 1543
}
```

---

### 4.6 Access Request APIs

#### **POST /access-requests**
Create access request

**Request:**
```json
{
  "targetUserId": "user-uuid-1",
  "roleId": "role-uuid-1",
  "requestType": "temporary_access",
  "businessJustification": "Need access to complete Q1 financial audit",
  "expiresAt": "2026-03-31T23:59:59Z"
}
```

**Response (201):**
```json
{
  "requestId": "request-uuid-1",
  "status": "pending",
  "requestedAt": "2026-02-10T10:30:00Z",
  "message": "Access request submitted successfully. Pending approval."
}
```

---

#### **GET /access-requests**
List access requests (paginated)

**Query Parameters:**
- `status` (optional): `pending`, `approved`, `rejected`
- `requester` (optional): Filter by requester user ID

**Response (200):**
```json
{
  "content": [
    {
      "requestId": "request-uuid-1",
      "requester": {
        "userId": "requester-uuid",
        "username": "jane.smith"
      },
      "targetUser": {
        "userId": "target-uuid",
        "username": "john.doe"
      },
      "role": {
        "roleId": "role-uuid",
        "roleName": "ROLE_FINANCE_VIEWER"
      },
      "status": "pending",
      "businessJustification": "Need access for audit",
      "requestedAt": "2026-02-10T10:30:00Z",
      "expiresAt": "2026-03-31T23:59:59Z"
    }
  ],
  "totalElements": 15
}
```

---

#### **POST /access-requests/{requestId}/approve**
Approve access request

**Request:**
```json
{
  "comment": "Approved for Q1 audit purposes"
}
```

**Response (200):**
```json
{
  "requestId": "request-uuid-1",
  "status": "approved",
  "approvedBy": "approver-uuid",
  "approvedAt": "2026-02-10T11:00:00Z",
  "message": "Access request approved. Role will be provisioned."
}
```

---

#### **POST /access-requests/{requestId}/reject**
Reject access request

**Request:**
```json
{
  "reason": "Insufficient business justification"
}
```

**Response (200):**
```json
{
  "requestId": "request-uuid-1",
  "status": "rejected",
  "rejectedBy": "approver-uuid",
  "rejectedAt": "2026-02-10T11:00:00Z",
  "message": "Access request rejected"
}
```

---

### 4.7 Audit APIs

#### **GET /audit/logs**
Query audit logs (paginated)

**Query Parameters:**
- `userId` (optional): Filter by user
- `eventType` (optional): `authentication`, `authorization`, `role_change`, `permission_change`
- `result` (optional): `success`, `failure`, `denied`
- `from` (required): Start date
- `to` (required): End date
- `page`, `size`: Standard pagination

**Response (200):**
```json
{
  "content": [
    {
      "auditId": "audit-uuid-1",
      "eventType": "authorization",
      "userId": "user-uuid-1",
      "username": "john.doe",
      "action": "read_confidential_report",
      "result": "denied",
      "reason": "User lacks READ_CONFIDENTIAL_DATA permission",
      "ipAddress": "192.168.1.100",
      "timestamp": "2026-02-10T10:30:00Z"
    }
  ],
  "totalElements": 156743
}
```

---

#### **GET /audit/roles/{roleId}**
Get role change history

**Response (200):**
```json
{
  "roleId": "role-uuid-1",
  "roleName": "ROLE_FINANCE_MANAGER",
  "changeHistory": [
    {
      "historyId": "history-uuid-1",
      "changeType": "permission_added",
      "changedBy": "admin-uuid",
      "changedAt": "2026-02-01T00:00:00Z",
      "beforeState": {
        "permissions": ["READ_FINANCE_DATA"]
      },
      "afterState": {
        "permissions": ["READ_FINANCE_DATA", "APPROVE_EXPENSES"]
      }
    }
  ]
}
```

---

### 4.8 Reporting APIs

#### **GET /reports/orphaned-accounts**
List orphaned accounts (users with no active roles)

**Response (200):**
```json
{
  "orphanedAccounts": [
    {
      "userId": "user-uuid-1",
      "username": "orphan.user",
      "email": "orphan.user@fmg.local",
      "lastActiveAt": "2025-12-01T00:00:00Z",
      "daysSinceLastActive": 71
    }
  ],
  "totalCount": 23
}
```

---

#### **GET /reports/dormant-accounts**
List dormant accounts (no activity in X days)

**Query Parameters:**
- `days` (default: 90): Inactivity threshold

**Response (200):**
```json
{
  "dormantAccounts": [
    {
      "userId": "user-uuid-1",
      "username": "inactive.user",
      "lastLoginAt": "2025-11-01T00:00:00Z",
      "daysSinceLastLogin": 101,
      "roles": ["ROLE_USER"]
    }
  ],
  "totalCount": 45,
  "inactivityThresholdDays": 90
}
```

---

#### **GET /reports/privileged-users**
List users with privileged roles

**Response (200):**
```json
{
  "privilegedUsers": [
    {
      "userId": "user-uuid-1",
      "username": "admin.user",
      "roles": [
        {
          "roleId": "role-uuid-1",
          "roleName": "ROLE_ADMIN",
          "isPrivileged": true,
          "assignedAt": "2026-01-01T00:00:00Z"
        }
      ]
    }
  ],
  "totalCount": 8
}
```

---

#### **GET /reports/sod-violations**
List Segregation of Duties violations

**Response (200):**
```json
{
  "sodViolations": [
    {
      "userId": "user-uuid-1",
      "username": "conflict.user",
      "conflictingRoles": [
        {
          "roleId": "role-uuid-1",
          "roleName": "ROLE_APPROVER"
        },
        {
          "roleId": "role-uuid-2",
          "roleName": "ROLE_REQUESTOR"
        }
      ],
      "sodRule": {
        "ruleId": "sod-rule-uuid-1",
        "ruleName": "Approver-Requestor Conflict",
        "severity": "critical"
      },
      "detectedAt": "2026-02-10T00:00:00Z"
    }
  ],
  "totalCount": 3
}
```

---

#### **GET /reports/role-matrix**
Get role-permission matrix

**Query Parameters:**
- `roleId` (optional): Filter by specific role

**Response (200):**
```json
{
  "roles": [
    {
      "roleId": "role-uuid-1",
      "roleName": "ROLE_FINANCE_MANAGER",
      "permissions": [
        {
          "permissionId": "perm-uuid-1",
          "permissionName": "READ_FINANCE_DATA",
          "action": "read"
        },
        {
          "permissionId": "perm-uuid-2",
          "permissionName": "APPROVE_EXPENSES",
          "action": "approve"
        }
      ]
    }
  ]
}
```

---

### 4.9 API Security Configuration

**Spring Security FilterChain:**
```java
@Configuration
@EnableWebSecurity
public class SecurityConfig {

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
            .csrf(csrf -> csrf.disable()) // JWT-based, stateless
            .authorizeHttpRequests(authz -> authz
                .requestMatchers("/api/v1/auth/login", "/api/v1/auth/refresh").permitAll()
                .requestMatchers("/api/v1/roles/**").hasRole("ADMIN")
                .requestMatchers("/api/v1/users/**").hasAnyRole("ADMIN", "HR_MANAGER")
                .requestMatchers("/api/v1/authz/**").authenticated()
                .anyRequest().authenticated()
            )
            .oauth2ResourceServer(oauth2 -> oauth2.jwt(jwt -> jwt.decoder(jwtDecoder())))
            .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS));
        return http.build();
    }
}
```

**Rate Limiting (Spring AOP + Caffeine):**
```java
@Aspect
@Component
public class RateLimitingAspect {

    private final Cache<String, AtomicInteger> requestCounts = Caffeine.newBuilder()
        .expireAfterWrite(1, TimeUnit.MINUTES)
        .build();

    @Around("@annotation(RateLimited)")
    public Object rateLimit(ProceedingJoinPoint joinPoint) throws Throwable {
        String username = SecurityContextHolder.getContext().getAuthentication().getName();
        AtomicInteger count = requestCounts.get(username, k -> new AtomicInteger(0));

        if (count.incrementAndGet() > 100) { // 100 requests per minute
            throw new TooManyRequestsException("Rate limit exceeded");
        }

        return joinPoint.proceed();
    }
}
```

---

## 5. Authorization Architecture

### 5.1 Authorization Decision Flow (Pure RBAC)

**Complete Authorization Flow:**

```
┌─────────────────────────────────────────────────────────────────┐
│ 1. User Request with JWT                                        │
│    GET /api/v1/finance/reports                                  │
│    Authorization: Bearer eyJhbGci...                            │
└──────────────────────┬──────────────────────────────────────────┘
                       ▼
┌─────────────────────────────────────────────────────────────────┐
│ 2. Spring Security Filter Chain                                 │
│    - JwtAuthenticationFilter                                    │
│      * Extract JWT from Authorization header                    │
│      * Validate JWT signature (RS256)                           │
│      * Check JWT expiration                                     │
│      * Check JWT blacklist (Caffeine cache)                     │
└──────────────────────┬──────────────────────────────────────────┘
                       ▼
┌─────────────────────────────────────────────────────────────────┐
│ 3. Extract User Identity & Roles from JWT                       │
│    Claims:                                                       │
│    - sub: "john.doe"                                             │
│    - roles: ["ROLE_USER", "ROLE_FINANCE_MANAGER"]               │
└──────────────────────┬──────────────────────────────────────────┘
                       ▼
┌─────────────────────────────────────────────────────────────────┐
│ 4. Method-Level Authorization Check                             │
│    @PreAuthorize("hasPermission('READ_FINANCE_DATA')")         │
│                                                                  │
│    Custom PermissionEvaluator.hasPermission():                  │
│    - Input: username="john.doe", permission="READ_FINANCE_DATA" │
└──────────────────────┬──────────────────────────────────────────┘
                       ▼
┌─────────────────────────────────────────────────────────────────┐
│ 5. Query Caffeine Cache: roleCache                              │
│    Key: "john.doe"                                               │
│    Result (if hit): ["ROLE_USER", "ROLE_FINANCE_MANAGER"]       │
│    Latency: <1ms                                                 │
│                                                                  │
│    If MISS:                                                      │
│    ├─ 6. Query PostgreSQL                                       │
│    │   SELECT r.* FROM roles r                                  │
│    │   JOIN user_role_assignments ura ON r.role_id = ura.role_id│
│    │   JOIN users u ON ura.user_id = u.user_id                 │
│    │   WHERE u.username = 'john.doe'                            │
│    │   AND ura.is_active = TRUE                                 │
│    │   AND (ura.expires_at IS NULL OR ura.expires_at > NOW())  │
│    │   Latency: ~20-50ms                                        │
│    │                                                             │
│    └─ 7. Cache result in roleCache (5-min TTL)                 │
└──────────────────────┬──────────────────────────────────────────┘
                       ▼
┌─────────────────────────────────────────────────────────────────┐
│ 8. For each role, query Caffeine Cache: permissionCache         │
│    Key: "ROLE_FINANCE_MANAGER"                                   │
│    Result (if hit): ["READ_FINANCE_DATA", "APPROVE_EXPENSES"]   │
│    Latency: <1ms                                                 │
│                                                                  │
│    If MISS:                                                      │
│    ├─ 9. Query PostgreSQL                                       │
│    │   SELECT p.* FROM permissions p                            │
│    │   JOIN role_permissions rp ON p.permission_id = rp.permission_id│
│    │   WHERE rp.role_id = 'role-uuid'                           │
│    │   AND rp.is_active = TRUE                                  │
│    │   Latency: ~20-50ms                                        │
│    │                                                             │
│    └─ 10. Cache result in permissionCache (5-min TTL)          │
└──────────────────────┬──────────────────────────────────────────┘
                       ▼
┌─────────────────────────────────────────────────────────────────┐
│ 11. Authorization Decision Logic                                │
│                                                                  │
│    Check for DENY permissions first:                            │
│    if (permissions.contains("DENY_READ_FINANCE_DATA")) {        │
│        return DENY;  // Explicit deny overrides allow           │
│    }                                                             │
│                                                                  │
│    Check for ALLOW permissions:                                 │
│    if (permissions.contains("READ_FINANCE_DATA")) {             │
│        return ALLOW;                                             │
│    }                                                             │
│                                                                  │
│    Default:                                                      │
│    return DENY;  // Default deny if no matching permission      │
└──────────────────────┬──────────────────────────────────────────┘
                       ▼
┌─────────────────────────────────────────────────────────────────┐
│ 12. Execute Business Logic or Return 403 Forbidden              │
│                                                                  │
│    If ALLOW:                                                     │
│    - Proceed to controller method                               │
│    - Execute business logic                                     │
│    - Return 200 OK with data                                    │
│                                                                  │
│    If DENY:                                                      │
│    - Throw AccessDeniedException                                │
│    - Return 403 Forbidden                                       │
│    - Message: "User lacks required permission"                  │
└──────────────────────┬──────────────────────────────────────────┘
                       ▼
┌─────────────────────────────────────────────────────────────────┐
│ 13. Async Audit Logging                                         │
│    @Async                                                        │
│    auditService.logAuthorizationEvent(                          │
│        username="john.doe",                                      │
│        action="READ_FINANCE_DATA",                               │
│        result="ALLOW",                                           │
│        timestamp=now()                                           │
│    );                                                            │
│                                                                  │
│    Inserted into audit_log table (partitioned)                  │
└─────────────────────────────────────────────────────────────────┘
```

**Performance Metrics:**
- Step 2-3 (JWT validation): ~5ms
- Step 5 (Cache hit): <1ms
- Step 6 (Cache miss, DB query): ~20-50ms
- Step 8 (Cache hit): <1ms
- Step 9 (Cache miss, DB query): ~20-50ms
- Step 11 (Authorization decision): <1ms
- Step 13 (Async audit log): Non-blocking

**Total Latency:**
- **Best case (cache hit):** ~10ms
- **Worst case (cache miss):** ~100ms
- **Average:** ~30ms
- **Target SLA:** <200ms ✅ Met

---

### 5.2 Spring Security Permission Evaluator

**Custom Permission Evaluator Implementation:**

```java
@Component
public class RbacPermissionEvaluator implements PermissionEvaluator {

    @Autowired
    private RoleService roleService;

    @Autowired
    private PermissionService permissionService;

    @Override
    public boolean hasPermission(Authentication authentication,
                                 Object targetDomainObject,
                                 Object permission) {
        if (authentication == null || !(permission instanceof String)) {
            return false;
        }

        String username = authentication.getName();
        String permissionName = (String) permission;

        // Get user's roles (from cache or database)
        List<Role> roles = roleService.getUserRoles(username);

        // Get permissions for all roles
        Set<String> userPermissions = new HashSet<>();
        for (Role role : roles) {
            List<Permission> rolePermissions = permissionService.getRolePermissions(role.getRoleId());
            for (Permission perm : rolePermissions) {
                // Check for DENY permissions first
                if (perm.getAction().equals("deny") &&
                    perm.getPermissionName().equals(permissionName)) {
                    return false; // Explicit deny
                }
                userPermissions.add(perm.getPermissionName());
            }
        }

        // Check if user has required permission
        return userPermissions.contains(permissionName);
    }

    @Override
    public boolean hasPermission(Authentication authentication,
                                 Serializable targetId,
                                 String targetType,
                                 Object permission) {
        return hasPermission(authentication, null, permission);
    }
}
```

**Usage in Controllers:**

```java
@RestController
@RequestMapping("/api/v1/finance")
public class FinanceController {

    @GetMapping("/reports")
    @PreAuthorize("hasPermission(null, 'READ_FINANCE_DATA')")
    public ResponseEntity<List<FinanceReport>> getReports() {
        // Business logic
        return ResponseEntity.ok(reports);
    }

    @PostMapping("/expenses/approve")
    @PreAuthorize("hasPermission(null, 'APPROVE_EXPENSES')")
    public ResponseEntity<Void> approveExpense(@RequestBody ExpenseRequest request) {
        // Business logic
        return ResponseEntity.ok().build();
    }
}
```

---

## 6. Pure RBAC Implementation Patterns

### 6.1 Data-Level Access Control (Pure RBAC Approach)

**Problem:** Finance Manager should only see Finance department employee records.

**ABAC Approach (NOT ALLOWED):**
```java
// WRONG: Compares user attribute to data attribute
if (user.getDepartment().equals(employee.getDepartment())) {
    return ALLOW;
}
```

**Pure RBAC Approach (CORRECT):**

```java
@Service
public class EmployeeService {

    @PreAuthorize("hasPermission(null, 'READ_FINANCE_DEPARTMENT_DATA')")
    public List<Employee> getFinanceEmployees() {
        // Role ROLE_FINANCE_MANAGER has permission READ_FINANCE_DEPARTMENT_DATA
        // Permission grants access to Finance department data
        return employeeRepository.findByDepartment("Finance");
    }

    @PreAuthorize("hasPermission(null, 'READ_ALL_DEPARTMENT_DATA')")
    public List<Employee> getAllEmployees() {
        // Role ROLE_ADMIN has permission READ_ALL_DEPARTMENT_DATA
        return employeeRepository.findAll();
    }
}
```

**PostgreSQL Row-Level Security (RLS) Example:**

```sql
-- Enable RLS on employee_data table
ALTER TABLE employee_data ENABLE ROW LEVEL SECURITY;

-- Policy: Finance managers can only see Finance department
CREATE POLICY finance_manager_policy ON employee_data
    FOR SELECT
    USING (
        department = 'Finance'
        AND EXISTS (
            SELECT 1 FROM user_role_assignments ura
            JOIN roles r ON ura.role_id = r.role_id
            WHERE ura.user_id = current_user_id()
              AND r.role_name = 'ROLE_FINANCE_MANAGER'
              AND ura.is_active = TRUE
        )
    );

-- Policy: Admins can see all departments
CREATE POLICY admin_policy ON employee_data
    FOR SELECT
    USING (
        EXISTS (
            SELECT 1 FROM user_role_assignments ura
            JOIN roles r ON ura.role_id = r.role_id
            WHERE ura.user_id = current_user_id()
              AND r.role_name = 'ROLE_ADMIN'
              AND ura.is_active = TRUE
        )
    );
```

**Key Principle:** Data access is determined by **role membership**, not by comparing user attributes to data attributes.

---

### 6.2 Classification-Based Access (Pure RBAC Approach)

**Problem:** HR Manager should see confidential employee data.

**ABAC Approach (NOT ALLOWED):**
```java
// WRONG: Compares user clearance level to data classification level
if (user.getClearanceLevel() >= data.getClassificationLevel()) {
    return ALLOW;
}
```

**Pure RBAC Approach (CORRECT):**

**Role Definition:**
```
ROLE_HR_VIEWER
  ├─ Permission: READ_PUBLIC_EMPLOYEE_DATA
  └─ Permission: READ_INTERNAL_EMPLOYEE_DATA

ROLE_HR_MANAGER (extends ROLE_HR_VIEWER)
  ├─ Permission: READ_CONFIDENTIAL_EMPLOYEE_DATA
  └─ Permission: MODIFY_EMPLOYEE_DATA

ROLE_HR_DIRECTOR (extends ROLE_HR_MANAGER)
  └─ Permission: READ_RESTRICTED_EMPLOYEE_DATA
```

**Service Layer Implementation:**

```java
@Service
public class EmployeeDataService {

    @PreAuthorize("hasPermission(null, 'READ_CONFIDENTIAL_EMPLOYEE_DATA')")
    public List<Employee> getConfidentialData() {
        // Role determines which classification levels are accessible
        return employeeRepository.findByClassificationIn(
            List.of("public", "internal", "confidential")
        );
    }

    @PreAuthorize("hasPermission(null, 'READ_RESTRICTED_EMPLOYEE_DATA')")
    public List<Employee> getRestrictedData() {
        // Only HR Directors have this permission
        return employeeRepository.findByClassification("restricted");
    }
}
```

**Database Schema for Classification:**

```sql
-- Permissions table with classification mapping
INSERT INTO permissions (permission_name, action, resource_type, classification_level)
VALUES
    ('READ_PUBLIC_EMPLOYEE_DATA', 'read', 'employee_data', 'public'),
    ('READ_INTERNAL_EMPLOYEE_DATA', 'read', 'employee_data', 'internal'),
    ('READ_CONFIDENTIAL_EMPLOYEE_DATA', 'read', 'employee_data', 'confidential'),
    ('READ_RESTRICTED_EMPLOYEE_DATA', 'read', 'employee_data', 'restricted');

-- Role-Permission mapping
-- ROLE_HR_MANAGER gets public + internal + confidential
INSERT INTO role_permissions (role_id, permission_id)
SELECT 'hr-manager-role-uuid', permission_id
FROM permissions
WHERE classification_level IN ('public', 'internal', 'confidential');
```

**Key Principle:** Roles map to classification levels. Authorization checks **role membership**, not attribute comparison.

---

### 6.3 Deny Permissions (Pure RBAC Approach)

**Problem:** Contractors inherit employee permissions but cannot access confidential documents.

**Role Hierarchy:**

```
ROLE_EMPLOYEE (parent)
  ├─ Permission: READ_GENERAL_DOCUMENTS
  ├─ Permission: READ_INTERNAL_DOCUMENTS
  └─ Permission: ACCESS_EMPLOYEE_PORTAL

ROLE_CONTRACTOR (child of ROLE_EMPLOYEE)
  ├─ Inherits all from ROLE_EMPLOYEE
  └─ Permission: DENY_READ_CONFIDENTIAL_DOCUMENTS (explicit deny)
```

**Authorization Logic with Deny:**

```java
@Component
public class RbacPermissionEvaluator implements PermissionEvaluator {

    @Override
    public boolean hasPermission(Authentication authentication,
                                 Object targetDomainObject,
                                 Object permission) {
        String username = authentication.getName();
        String permissionName = (String) permission;

        List<Role> roles = roleService.getUserRoles(username);
        Set<String> allowPermissions = new HashSet<>();
        Set<String> denyPermissions = new HashSet<>();

        // Collect all permissions from all roles
        for (Role role : roles) {
            List<Permission> rolePermissions = permissionService.getRolePermissions(role.getRoleId());
            for (Permission perm : rolePermissions) {
                if (perm.getAction().equals("deny")) {
                    denyPermissions.add(perm.getPermissionName());
                } else {
                    allowPermissions.add(perm.getPermissionName());
                }
            }
        }

        // Check DENY first (deny overrides allow)
        if (denyPermissions.contains(permissionName)) {
            return false; // Explicit deny
        }

        // Then check ALLOW
        return allowPermissions.contains(permissionName);
    }
}
```

**Database Schema:**

```sql
-- Insert deny permission
INSERT INTO permissions (permission_name, action, resource_type)
VALUES ('DENY_READ_CONFIDENTIAL_DOCUMENTS', 'deny', 'document');

-- Assign deny permission to ROLE_CONTRACTOR
INSERT INTO role_permissions (role_id, permission_id)
VALUES ('contractor-role-uuid', 'deny-permission-uuid');
```

**Controller Usage:**

```java
@RestController
@RequestMapping("/api/v1/documents")
public class DocumentController {

    @GetMapping("/confidential")
    @PreAuthorize("!hasPermission(null, 'DENY_READ_CONFIDENTIAL_DOCUMENTS') " +
                  "and hasPermission(null, 'READ_CONFIDENTIAL_DOCUMENTS')")
    public ResponseEntity<List<Document>> getConfidentialDocuments() {
        // Business logic
        return ResponseEntity.ok(documents);
    }
}
```

**Key Principle:** Deny is a **permission type** assigned to a role, not a dynamic rule based on user attributes.

---

### 6.4 Temporal Role Assignments (Pure RBAC Approach)

**Problem:** Grant temporary project access that expires after project completion.

**Pure RBAC Approach:**

```java
@Service
public class RoleAssignmentService {

    public void assignTemporaryRole(String userId, String roleId, LocalDateTime expiresAt) {
        UserRoleAssignment assignment = new UserRoleAssignment();
        assignment.setUserId(userId);
        assignment.setRoleId(roleId);
        assignment.setAssignedAt(LocalDateTime.now());
        assignment.setExpiresAt(expiresAt); // Set expiration at PROVISIONING time
        assignment.setIsActive(true);

        assignmentRepository.save(assignment);

        // Evict cache
        cacheManager.getCache("roleCache").evict(userId);
    }

    public List<Role> getUserActiveRoles(String userId) {
        // Query only returns active, non-expired roles
        return roleRepository.findActiveRolesByUserId(userId, LocalDateTime.now());
    }
}
```

**SQL Query (Checks Expiration at Authorization Time):**

```sql
SELECT r.* FROM roles r
JOIN user_role_assignments ura ON r.role_id = ura.role_id
JOIN users u ON ura.user_id = u.user_id
WHERE u.username = :username
  AND ura.is_active = TRUE
  AND (ura.expires_at IS NULL OR ura.expires_at > NOW());  -- Check expiration
```

**Scheduled Job to Deactivate Expired Roles:**

```java
@Component
public class RoleExpirationJob {

    @Scheduled(cron = "0 0 * * * *") // Every hour
    public void deactivateExpiredRoles() {
        List<UserRoleAssignment> expired = assignmentRepository.findExpiredAssignments(LocalDateTime.now());

        for (UserRoleAssignment assignment : expired) {
            assignment.setIsActive(false);
            assignment.setRevocationReason("Expired");
            assignmentRepository.save(assignment);

            // Evict cache
            cacheManager.getCache("roleCache").evict(assignment.getUserId());

            // Send notification
            notificationService.sendRoleExpiredNotification(assignment);
        }
    }
}
```

**Key Principle:** Expiration is set at **provisioning time** (`expires_at` field), not evaluated as runtime context. Authorization checks if role is currently active and not expired.

---

## 7. Integration Architecture

### 7.1 Active Directory Integration

**AD Synchronization Service:**

```java
@Service
public class AdSyncService {

    @Autowired
    private LdapTemplate ldapTemplate;

    @Autowired
    private UserRepository userRepository;

    @Scheduled(fixedRate = 300000) // Every 5 minutes (delta sync)
    public void deltaSyncUsers() {
        AdSyncLog syncLog = createSyncLog("delta");

        try {
            // Query AD for users modified since last sync
            String filter = "(&(objectClass=user)(whenChanged>=" + lastSyncTime + "))";
            List<AdUser> adUsers = ldapTemplate.search(
                "", filter, new AdUserAttributeMapper()
            );

            for (AdUser adUser : adUsers) {
                syncUser(adUser);
            }

            completeSyncLog(syncLog, "success", adUsers.size());
        } catch (Exception e) {
            completeSyncLog(syncLog, "failed", 0);
            throw e;
        }
    }

    @Scheduled(cron = "0 0 2 * * *") // Daily at 2 AM (full sync)
    public void fullSyncUsers() {
        AdSyncLog syncLog = createSyncLog("full");

        try {
            String filter = "(&(objectClass=user)(!(userAccountControl:1.2.840.113556.1.4.803:=2)))";
            List<AdUser> adUsers = ldapTemplate.search(
                "", filter, new AdUserAttributeMapper()
            );

            for (AdUser adUser : adUsers) {
                syncUser(adUser);
            }

            completeSyncLog(syncLog, "success", adUsers.size());
        } catch (Exception e) {
            completeSyncLog(syncLog, "failed", 0);
            throw e;
        }
    }

    private void syncUser(AdUser adUser) {
        User user = userRepository.findByAdGuid(adUser.getGuid())
            .orElse(new User());

        user.setAdGuid(adUser.getGuid());
        user.setUsername(adUser.getUsername());
        user.setEmail(adUser.getEmail());
        user.setFirstName(adUser.getFirstName());
        user.setLastName(adUser.getLastName());
        user.setDepartment(adUser.getDepartment());
        user.setTitle(adUser.getTitle());
        user.setLastSyncAt(LocalDateTime.now());

        if (adUser.isDisabled()) {
            user.setStatus("suspended");
        } else if (user.getStatus().equals("suspended")) {
            user.setStatus("active");
        }

        userRepository.save(user);
    }
}
```

**AD Attribute Mapper:**

```java
public class AdUserAttributeMapper implements AttributesMapper<AdUser> {

    @Override
    public AdUser mapFromAttributes(Attributes attrs) throws NamingException {
        AdUser user = new AdUser();
        user.setGuid(getGuid(attrs.get("objectGUID")));
        user.setUsername(getAttribute(attrs, "sAMAccountName"));
        user.setEmail(getAttribute(attrs, "mail"));
        user.setFirstName(getAttribute(attrs, "givenName"));
        user.setLastName(getAttribute(attrs, "sn"));
        user.setDepartment(getAttribute(attrs, "department"));
        user.setTitle(getAttribute(attrs, "title"));
        user.setDisabled(isAccountDisabled(attrs.get("userAccountControl")));
        return user;
    }

    private String getAttribute(Attributes attrs, String name) throws NamingException {
        Attribute attr = attrs.get(name);
        return attr != null ? (String) attr.get() : null;
    }

    private UUID getGuid(Attribute attr) throws NamingException {
        byte[] bytes = (byte[]) attr.get();
        // Convert AD GUID bytes to UUID
        return convertBytesToUuid(bytes);
    }
}
```

---

### 7.2 SAML SSO Integration (Spring Security SAML2)

**SAML Configuration:**

```yaml
spring:
  security:
    saml2:
      relyingparty:
        registration:
          fmg-saml:
            assertingparty:
              metadata-uri: https://rbac.fmg.local/saml/metadata
            entity-id: https://rbac.fmg.local
            acs:
              location: https://rbac.fmg.local/login/saml2/sso/fmg-saml
            signing:
              credentials:
                - private-key-location: classpath:saml/private-key.pem
                  certificate-location: classpath:saml/certificate.pem
```

**SAML Security Configuration:**

```java
@Configuration
public class Saml2SecurityConfig {

    @Bean
    public SecurityFilterChain samlFilterChain(HttpSecurity http) throws Exception {
        http
            .authorizeHttpRequests(authz -> authz
                .requestMatchers("/saml/**").permitAll()
                .anyRequest().authenticated()
            )
            .saml2Login(saml2 -> saml2
                .loginProcessingUrl("/login/saml2/sso/{registrationId}")
                .defaultSuccessUrl("/dashboard")
            )
            .saml2Logout(saml2 -> saml2
                .logoutUrl("/logout/saml2")
                .logoutResponse(response -> response
                    .logoutUrl("/logout/saml2/response")
                )
            );
        return http.build();
    }
}
```

---

### 7.3 SIEM Integration (Syslog Export)

**Logback Syslog Appender (logback-spring.xml):**

```xml
<configuration>
    <appender name="SYSLOG" class="ch.qos.logback.classic.net.SyslogAppender">
        <syslogHost>siem.fmg.local</syslogHost>
        <port>514</port>
        <facility>LOCAL0</facility>
        <suffixPattern>%logger{36} - %msg</suffixPattern>
    </appender>

    <logger name="com.fmg.rbac.audit" level="INFO">
        <appender-ref ref="SYSLOG" />
    </logger>
</configuration>
```

**Audit Logging Service:**

```java
@Service
public class AuditService {

    private static final Logger syslogLogger = LoggerFactory.getLogger("com.fmg.rbac.audit");

    @Async
    public void logAuthorizationEvent(String username, String action, String result) {
        AuditLog auditLog = new AuditLog();
        auditLog.setEventType("authorization");
        auditLog.setUsername(username);
        auditLog.setAction(action);
        auditLog.setResult(result);
        auditLog.setTimestamp(LocalDateTime.now());

        // Save to PostgreSQL
        auditLogRepository.save(auditLog);

        // Send to SIEM via syslog
        syslogLogger.info("event=authorization user={} action={} result={}",
            username, action, result);
    }
}
```

---

## 8. Security Architecture

### 8.1 Encryption

**Data at Rest (PostgreSQL):**
- Use PostgreSQL Transparent Data Encryption (TDE) or OS-level encryption (LUKS)
- Backup encryption via `pg_dump` with encryption flag

**Data in Transit:**
- LDAPS: TLS 1.2+ for Active Directory connections
- HTTPS: TLS 1.2+ for all API endpoints
- PostgreSQL: SSL connections required

**Secrets Management:**

```yaml
spring:
  cloud:
    config:
      server:
        encrypt:
          enabled: true
        git:
          uri: https://git.fmg.local/rbac-config.git
          username: ${GIT_USER}
          password: ${GIT_PASSWORD_ENCRYPTED}
```

---

### 8.2 JWT Key Management

**RSA Key Pair Generation:**

```bash
# Generate private key
openssl genrsa -out private_key.pem 2048

# Generate public key
openssl rsa -in private_key.pem -pubout -out public_key.pem

# Convert to PKCS#8 format for Java
openssl pkcs8 -topk8 -inform PEM -in private_key.pem -out private_key_pkcs8.pem -nocrypt
```

**Key Rotation Strategy:**
- Rotate JWT signing keys annually
- Maintain 2 active key pairs during rotation period (30 days)
- Old tokens remain valid until expiration

---

## 9. Deployment Architecture

### 9.1 Production Deployment

```
                    ┌──────────────────┐
                    │  Load Balancer   │
                    │  (Nginx/HAProxy) │
                    └────────┬─────────┘
                             │
          ┌──────────────────┼──────────────────┐
          ▼                  ▼                  ▼
    ┌──────────┐       ┌──────────┐       ┌──────────┐
    │ App      │       │ App      │       │ App      │
    │ Server 1 │       │ Server 2 │       │ Server 3 │
    │ (Spring) │       │ (Spring) │       │ (Spring) │
    └────┬─────┘       └────┬─────┘       └────┬─────┘
         │                  │                  │
         └──────────────────┼──────────────────┘
                            │
              ┌─────────────┴─────────────┐
              │                           │
         ┌────▼──────┐             ┌──────▼─────┐
         │ PostgreSQL│             │   Active   │
         │  Primary  │◄───────────►│  Directory │
         └────┬──────┘ Streaming   └────────────┘
              │        Replication
         ┌────▼──────┐
         │ PostgreSQL│
         │  Replica  │
         └───────────┘
```

---

## 10. Performance Optimization

### 10.1 Database Indexes

**Critical Indexes for <200ms Authorization:**

```sql
-- User lookup by username (authentication)
CREATE INDEX idx_users_username ON users(username);

-- Active role assignments for user (authorization)
CREATE INDEX idx_ura_user_active ON user_role_assignments(user_id, is_active);

-- Role permissions lookup (authorization)
CREATE INDEX idx_rp_role_active ON role_permissions(role_id, is_active);

-- Composite index for authorization query
CREATE INDEX idx_ura_user_role_active_expires ON user_role_assignments(user_id, role_id, is_active, expires_at);
```

---

### 10.2 Caffeine Cache Tuning

```java
@Configuration
public class CacheConfig {

    @Bean
    public CacheManager cacheManager() {
        CaffeineCacheManager cacheManager = new CaffeineCacheManager(
            "roleCache", "permissionCache", "userCache", "tokenBlacklist"
        );
        cacheManager.setCaffeine(Caffeine.newBuilder()
            .maximumSize(10000)
            .expireAfterWrite(5, TimeUnit.MINUTES)
            .recordStats() // Enable metrics
        );
        return cacheManager;
    }

    @Scheduled(fixedRate = 60000)
    public void logCacheStats() {
        CaffeineCache roleCache = (CaffeineCache) cacheManager.getCache("roleCache");
        CacheStats stats = roleCache.getNativeCache().stats();

        log.info("roleCache stats: hitRate={}, evictions={}",
            stats.hitRate(), stats.evictionCount());
    }
}
```

---

## Appendices

### Appendix A: Sample Data

**Sample Roles:**
```sql
INSERT INTO roles (role_id, role_name, description, role_type)
VALUES
    (gen_random_uuid(), 'ROLE_USER', 'Standard user access', 'functional'),
    (gen_random_uuid(), 'ROLE_ADMIN', 'System administrator', 'functional'),
    (gen_random_uuid(), 'ROLE_FINANCE_MANAGER', 'Finance department manager', 'organizational'),
    (gen_random_uuid(), 'ROLE_HR_MANAGER', 'HR department manager', 'organizational'),
    (gen_random_uuid(), 'ROLE_CONTRACTOR', 'External contractor', 'functional');
```

**Sample Permissions:**
```sql
INSERT INTO permissions (permission_id, permission_name, action, resource_type)
VALUES
    (gen_random_uuid(), 'READ_FINANCE_DATA', 'read', 'application'),
    (gen_random_uuid(), 'APPROVE_EXPENSES', 'approve', 'function'),
    (gen_random_uuid(), 'MANAGE_USERS', 'admin', 'application'),
    (gen_random_uuid(), 'DENY_READ_CONFIDENTIAL_DOCUMENTS', 'deny', 'document');
```

---

### Appendix B: Acronyms

| Term | Definition |
|------|------------|
| ABAC | Attribute-Based Access Control |
| ACID | Atomicity, Consistency, Isolation, Durability |
| AD | Active Directory |
| AES | Advanced Encryption Standard |
| API | Application Programming Interface |
| CRUD | Create, Read, Update, Delete |
| DTO | Data Transfer Object |
| GUID | Globally Unique Identifier |
| HikariCP | High-performance JDBC connection pool |
| IOPS | Input/Output Operations Per Second |
| JPA | Java Persistence API |
| JSON | JavaScript Object Notation |
| JSONB | JSON Binary (PostgreSQL data type) |
| JWT | JSON Web Token |
| LDAP | Lightweight Directory Access Protocol |
| LDAPS | LDAP over SSL/TLS |
| MFA | Multi-Factor Authentication |
| OAuth | Open Authorization |
| OIDC | OpenID Connect |
| ORM | Object-Relational Mapping |
| PEM | Privacy-Enhanced Mail (certificate format) |
| PITR | Point-In-Time Recovery |
| PKCS | Public-Key Cryptography Standards |
| RBAC | Role-Based Access Control |
| REST | Representational State Transfer |
| RLS | Row-Level Security |
| RPO | Recovery Point Objective |
| RS256 | RSA Signature with SHA-256 |
| RTO | Recovery Time Objective |
| SAML | Security Assertion Markup Language |
| SCIM | System for Cross-domain Identity Management |
| SHA | Secure Hash Algorithm |
| SIEM | Security Information and Event Management |
| SLA | Service Level Agreement |
| SMTP | Simple Mail Transfer Protocol |
| SoD | Segregation of Duties |
| SQL | Structured Query Language |
| SSE | Server-Sent Events |
| SSL | Secure Sockets Layer |
| SSO | Single Sign-On |
| TDE | Transparent Data Encryption |
| TLS | Transport Layer Security |
| TOTP | Time-based One-Time Password |
| TTL | Time To Live |
| UUID | Universally Unique Identifier |
| WAL | Write-Ahead Logging |
| WCAG | Web Content Accessibility Guidelines |

---

## Document Sign-Off

| Role | Name | Signature | Date |
|------|------|-----------|------|
| **Enterprise Architect** | | | |
| **Security Architect** | | | |
| **Lead Developer** | | | |
| **Database Administrator** | | | |
| **QA Lead** | | | |

---

**END OF ARCHITECTURE & DETAILED DESIGN DOCUMENT**
