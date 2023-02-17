

CREATE TABLE [ReportNote] (
  [Id] int PRIMARY KEY IDENTITY(1, 1),
  [ReportId] int NOT NULL,
  [Content] varchar(255) NOT NULL,
  [UserId] int NOT NULL,
  [CreateDateTime] datetime NOT NULL
)
GO

ALTER TABLE [ReportNote] ADD FOREIGN KEY ([ReportId]) REFERENCES [Report] ([Id]) ON DELETE CASCADE
GO
ALTER TABLE [ReportNote] ADD FOREIGN KEY ([UserId]) REFERENCES [User] ([Id])
GO

SET IDENTITY_INSERT [ReportNote] ON
INSERT INTO [ReportNote]
    ([Id], [CreateDateTime], [ReportId], [Content], [UserId])
VALUES
    (1, SYSDATETIME(), 1, 'All issues fixed', 7)
   
SET IDENTITY_INSERT [ClaimVehicle] OFF

