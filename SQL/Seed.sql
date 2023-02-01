SET IDENTITY_INSERT [User] ON
INSERT INTO [User]
    ([Id],[FirebaseUserId], [FirstName],[LastName], [Email], [CreatedDate],[HireDate],[JobTitle],[UserTypeId], [ImageUrl])
VALUES
    (1, '8XeC8bZveDYSMOYF4qxDglIVZyE2', 'Tyrus','Barkley','tyrus@gmail.com', SYSDATETIME(), NULL, 'Suppervisor', 2,'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcShg8keaWuTWemET3-1mWqZae05N8W6SLGgGg&usqp=CAU' ),
    (2, 'ynbkI8OOTrX2ryko9K00VE6eOS42','Thomas', 'Reed', 'thomas@gmail.com', SYSDATETIME(), NULL, 'Equipment Operator Senior', 1, 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcShg8keaWuTWemET3-1mWqZae05N8W6SLGgGg&usqp=CAU'),
    (3, 'vLA6fNDsV2f48xTRfuM92fHOJ362', 'Mike', 'Thompson','mike@gmail.com', SYSDATETIME(), NULL, 'Equipment Operator Senior', 1, 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcShg8keaWuTWemET3-1mWqZae05N8W6SLGgGg&usqp=CAU');
SET IDENTITY_INSERT [User] OFF


SET IDENTITY_INSERT [Vehicle] ON
INSERT INTO [Vehicle]
    ([Id], [CurrentMileage], [MileageAtPMService], [VehicleNumber], [IsApproved], [IsClaimed], [IsInShop], [VehicleTypeId])
VALUES
    (1, 20000, 20000, '5386AD', 1, 1, 0, 1),
    (2, 32000, 20000, '5387AD', 1, 0, 0, 1),
    (3, 22000, 20000, '5388AD', 1, 1, 0, 1),
    (4, 45230, 20000, '5342AD', 1, 1, 1, 1),
    (5, 51000, 20000, '5142AD', 1, 0, 0, 2),
    (6, 3000, 0, '5147AD', 1, 0, 0, 2),
    (7, 2000, 0, '5887AD', 1, 0, 0, 3)
SET IDENTITY_INSERT [Vehicle] OFF


SET IDENTITY_INSERT [ClaimVehicle] ON
INSERT INTO [ClaimVehicle]
    ([Id], [BeginDate], [VehicleId], [UserId], [EndDate])
VALUES
    (1, SYSDATETIME(), 1, 1, NULL),
    (2, SYSDATETIME(), 3, 2, NULL),
    (3, SYSDATETIME(), 4, 3, NULL)
SET IDENTITY_INSERT [ClaimVehicle] OFF


SET IDENTITY_INSERT [UserType] ON
INSERT INTO [UserType]
    ([Id], [Name])
VALUES
    (1, 'Employee'),
    (2, 'Supervizor'),
    (3, 'Mechanic')
SET IDENTITY_INSERT [UserType] OFF


SET IDENTITY_INSERT [Report] ON
INSERT INTO [Report]
    ([Id], [UserId], [VehicleId], [Issue], [DateCreated], [DateCompleted], [CategoryId])
VALUES
    (1, 1, 1, 'PM Service', SYSDATETIME(), NULL, 1),
    (2, 1, 6, 'PM Service', SYSDATETIME(), NULL, 1),
    (3, 2, 2, 'PM Service', SYSDATETIME(), NULL, 1),
    (4, 2, 3, 'Hydrolic Filter Leak', SYSDATETIME(), NULL, 2),
    (5, 3, 5, 'PM Service', SYSDATETIME(), NULL, 1)
SET IDENTITY_INSERT [Report] OFF

SET IDENTITY_INSERT [ReportTag] ON
INSERT INTO [ReportTag]
    ([Id], [ReportId], [TagId])
VALUES
    (1, 1, 1),
    (2, 1, 1),
    (3, 1, 1),
    (4, 1, 2),
    (5, 1, 1)
    
SET IDENTITY_INSERT [ReportTag] OFF


SET IDENTITY_INSERT [Tag] ON
INSERT INTO [Tag]
    ([Id], [Status])
VALUES
    (1, 'PM Serivice'),
    (2, 'Hydrolic Leak'),
    (3, 'Tire Change'),
    (4, 'Fluid Top Off'),
    (5, 'Grease'),
    (6, 'Check Engine Light')
    
SET IDENTITY_INSERT [Tag] OFF



SET IDENTITY_INSERT [VehicleType] ON
INSERT INTO [VehicleType]
    ([Id], [Name])
VALUES
    (1, 'Side Arm'),
    (2, 'Rear Loader'),
    (3, 'Front Loader')
    
SET IDENTITY_INSERT [VehicleType] OFF


SET IDENTITY_INSERT [Category] ON
INSERT INTO [Category]
    ([Id], [Stage])
VALUES
    (1, 'Quick'),
    (2, 'Moderate'),
    (3, 'Dificult')
    
SET IDENTITY_INSERT [Category] OFF