USE [master]
GO

IF db_id('ReadyLine') IS NOT NULL
BEGIN
  ALTER DATABASE [ReadyLine] SET SINGLE_USER WITH ROLLBACK IMMEDIATE;
  DROP DATABASE [ReadyLine]
END
GO

CREATE DATABASE [ReadyLine]
GO

USE [ReadyLine]
GO


CREATE TABLE [User] (
  [Id] int PRIMARY KEY IDENTITY(1, 1),
  [FirebaseUserId] nvarchar(255) UNIQUE NOT NULL,
  [Email] nvarchar(255) NOT NULL,
  [FirstName] nvarchar(255) NOT NULL,
  [LastName] nvarchar(255) NOT NULL,
  [ImageUrl] nvarchar(255) NOT NULL,
  [CreatedDate] datetime NOT NULL,
  [HireDate] datetime,
  [JobTitle] nvarchar(255) NOT NULL,
  [UserTypeId] int NOT NULL
)
GO

CREATE TABLE [UserType] (
  [Id] int PRIMARY KEY IDENTITY(1, 1),
  [Name] nvarchar(255) NOT NULL
)
GO

CREATE TABLE [Vehicle] (
  [Id] int PRIMARY KEY IDENTITY(1, 1),
  [VehicleTypeId] int NOT NULL,
  [MileageAtPMService] int NOT NULL,
  [CurrentMileage] int,
  [VehicleNumber] nvarchar(255) NOT NULL,
  [IsApproved] bit,
  [IsClaimed] bit,
  [IsInShop] bit
)
GO

CREATE TABLE [Report] (
  [Id] int PRIMARY KEY IDENTITY(1, 1),
  [UserId] int NOT NULL,
  [VehicleId] int NOT NULL,
  [Issue] nvarchar(255) NOT NULL,
  [DateCreated] datetime NOT NULL,
  [DateCompleted] datetime,
  [CategoryId] int
)
GO

CREATE TABLE [ReportTag] (
  [Id] int PRIMARY KEY IDENTITY(1, 1),
  [ReportId] int NOT NULL,
  [TagId] int NOT NULL
)
GO

CREATE TABLE [Tag] (
  [Id] int PRIMARY KEY IDENTITY(1, 1),
  [Status] nvarchar(255) NOT NULL
)
GO

CREATE TABLE [VehicleType] (
  [Id] int PRIMARY KEY IDENTITY(1, 1),
  [Name] nvarchar(255) NOT NULL
)
GO

CREATE TABLE [Category] (
  [Id] int PRIMARY KEY IDENTITY(1, 1),
  [Stage] nvarchar(255) NOT NULL
)
GO

CREATE TABLE [ClaimVehicle] (
  [Id] int PRIMARY KEY IDENTITY(1, 1),
  [UserId] int NOT NULL,
  [VehicleId] int NOT NULL,
  [BeginDate] datetime,
  [EndDate] datetime
)
GO

ALTER TABLE [ClaimVehicle] ADD FOREIGN KEY ([UserId]) REFERENCES [User] ([Id])
GO

ALTER TABLE [ClaimVehicle] ADD FOREIGN KEY ([VehicleId]) REFERENCES [Vehicle] ([Id]) ON DELETE CASCADE
GO

ALTER TABLE [User] ADD FOREIGN KEY ([UserTypeId]) REFERENCES [UserType] ([Id])
GO

ALTER TABLE [ReportTag] ADD FOREIGN KEY ([ReportId]) REFERENCES [Report] ([Id]) ON DELETE CASCADE
GO

ALTER TABLE [Report] ADD FOREIGN KEY ([UserId]) REFERENCES [User] ([Id])
GO

ALTER TABLE [Report] ADD FOREIGN KEY ([VehicleId]) REFERENCES [Vehicle] ([Id]) ON DELETE CASCADE
GO

ALTER TABLE [ReportTag] ADD FOREIGN KEY ([TagId]) REFERENCES [Tag] ([Id]) ON DELETE CASCADE
GO

ALTER TABLE [Vehicle] ADD FOREIGN KEY ([VehicleTypeId]) REFERENCES [VehicleType] ([Id])
GO

ALTER TABLE [Report] ADD FOREIGN KEY ([CategoryId]) REFERENCES [Category] ([Id])
GO
