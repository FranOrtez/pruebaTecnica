-- Crear base de datos
IF NOT EXISTS (SELECT name FROM master.dbo.sysdatabases WHERE name = N'ProductsDb')
BEGIN
    CREATE DATABASE [ProductsDb];
END
GO

USE [ProductsDb];
GO

-- Crear tabla Users
IF NOT EXISTS (SELECT * FROM sysobjects WHERE name='Users' and xtype='U')
BEGIN
    CREATE TABLE Users (
        Id INT IDENTITY(1,1) PRIMARY KEY,
        Email NVARCHAR(255) NOT NULL UNIQUE,
        PasswordHash NVARCHAR(MAX) NOT NULL,
        Role NVARCHAR(50) NOT NULL,
        CreatedAt DATETIME2 NOT NULL DEFAULT GETDATE(),
        UpdatedAt DATETIME2 NULL
    );
END
GO

-- Crear tabla ProductTypes
IF NOT EXISTS (SELECT * FROM sysobjects WHERE name='ProductTypes' and xtype='U')
BEGIN
    CREATE TABLE ProductTypes (
        Id INT PRIMARY KEY,
        Name NVARCHAR(100) NOT NULL
    );

    -- Insertar datos semilla
    INSERT INTO ProductTypes (Id, Name) VALUES (1, 'Belleza'), (2, 'Hogar'), (3, 'Cocina');
END
GO

-- Crear tabla Products
IF NOT EXISTS (SELECT * FROM sysobjects WHERE name='Products' and xtype='U')
BEGIN
    CREATE TABLE Products (
        Id INT IDENTITY(1,1) PRIMARY KEY,
        Name NVARCHAR(255) NOT NULL,
        Description NVARCHAR(1000) NOT NULL,
        Price DECIMAL(18,2) NOT NULL,
        Stock INT NOT NULL,
        ProductTypeId INT NOT NULL,
        CreatedAt DATETIME2 NOT NULL DEFAULT GETDATE(),
        UpdatedAt DATETIME2 NULL,
        CONSTRAINT FK_Products_ProductTypes FOREIGN KEY (ProductTypeId) REFERENCES ProductTypes(Id)
    );
END
GO
