SET IDENTITY_INSERT [AdminRequestType] ON
INSERT INTO [AdminRequestType]
    ([Id], [Type])
VALUES
    (1, 'Promote'),
    (2, 'Demote'),
    (3, 'Deactivate')
SET IDENTITY_INSERT [AdminRequestType] OFF