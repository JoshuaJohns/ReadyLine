

CREATE TABLE [AdminRequest] (
  [Id] int PRIMARY KEY IDENTITY(1, 1),
  [RequesterUserId] int NOT NULL,
  [TargetUserId] int NOT NULL,
  [AdminRequestTypeId] int NOT NULL,
  CreateDateTime dateTime,
  CloseDateTime datetime,
  IsCancelled bit
)
GO

CREATE TABLE [AdminRequestType] (
  [Id] int PRIMARY KEY IDENTITY(1, 1),
  [Type] varchar(255) NOT NULL
)
GO

ALTER TABLE [AdminRequest] ADD FOREIGN KEY ([RequesterUserId]) REFERENCES [User] ([Id])
GO

ALTER TABLE [AdminRequest] ADD FOREIGN KEY ([TargetUserId]) REFERENCES [User] ([Id])
GO

ALTER TABLE [AdminRequest] ADD FOREIGN KEY ([AdminRequestTypeId]) REFERENCES [AdminRequestType] ([Id]) ON DELETE CASCADE
GO