table = 'rsr_projectupdate'
fields = ['id', 'project_id', 'user_id', 'title', 'text', 'photo', 'photo_location', 'photo_caption', 'photo_credit', 'update_method', 'time']
#default item format: "fieldname":("type", "value")
default = {}
records = [
[3, 1, 1, u'foo', u'', u'', u'', u'', u'', u'W', '2008-06-22 17:42:16']
[4, 1, 1, u'asdasd', u'asdasd asdasd', u'', u'E', u'', u'', u'W', '2008-06-22 17:44:33']
[5, 1, 1, u'Students at school', u'This is a picture from just outside the school where the students normally work every day. They are lined up before starting class.', u'img/2008/06/22/fodra-group-1_.png', u'B', u'Students at school', u'Mark charmer', u'W', '2008-06-22 21:59:11']
[6, 2, 1, u'Integer eget sem.', u'Nulla facilisi. In vel sem. Morbi id urna in diam dignissim feugiat. Proin molestie tortor eu velit. Aliquam erat volutpat. Nullam ultrices, diam tempus vulputate egestas, eros pede varius leo, sed imperdiet lectus est ornare odio. Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Proin consectetuer velit in dui. Phasellus wisi purus, interdum vitae, rutrum accumsan, viverra in, velit. Sed enim risus, congue non, tristique in, commodo eu, metus. Aenean tortor mi, imperdiet id, gravida eu, posuere eu, felis. Mauris sollicitudin, turpis in hendrerit sodales, lectus ipsum pellentesque ligula, sit amet scelerisque urna nibh ut arcu. Aliquam in lacus. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Nulla placerat aliquam wisi. Mauris viverra odio. Quisque fermentum pulvinar odio. Proin posuere est vitae ligula. Etiam euismod. Cras a eros.', u'img/2008/06/23/logo_akvo_250.png', u'B', u'Lorem ipsum dolor sit amet, consectetuer adipiscing elit', u'', u'W', '2008-06-23 19:27:53']
[7, 2, 1, u'Donec non tortor in arcu mollis feugiat', u'Aliquam adipiscing libero vitae leo\r\n\r\nVivamus convallis urna id felis\r\n\r\nFusce luctus convallis justo\r\n\r\nMaecenas tempus dictum libero\r\n\r\nLorem ipsum dolor sit amet, consectetuer adipiscing elit\r\n\r\n', u'', u'', u'', u'', u'W', '2008-06-23 19:31:04']
[8, 2, 1, u'Donec non tortor in arcu mollis feugiat', u'Aliquam adipiscing libero vitae leo\r\n\r\nVivamus convallis urna id felis\r\n\r\nFusce luctus convallis justo\r\n\r\nMaecenas tempus dictum libero\r\n\r\nLorem ipsum dolor sit amet, consectetuer adipiscing elit\r\n\r\n', u'', u'', u'', u'', u'W', '2008-06-23 19:31:26']
[9, 2, 1, u'Picture from outside school', u'This is a picture from just outside one of the schools. During summer season this road is usually flooded and this creates problems when no proper sanitation facilities are in place.', u'img/2008/06/23/fodra-group-3.jpg', u'E', u'dfgsd sdfg sdfg', u'dsfg sdf sdfg sdfg sdfgs', u'W', '2008-06-23 20:17:05']
[12, 1, 1, u'Maintenance training completed', u'We have completed the the maintenance training for the ecosan toilets. We did it for 30 people last saturday.', u'', u'', u'', u'', u'W', '2008-06-23 21:20:55']
[13, 1, 1, u'Community meeting', u'Completed first community meeting today.', u'img/2008/06/23/1493799561_8a474eca3f_m.jpg', u'E', u'Pratap Nagar', u'Mark Charmer', u'W', '2008-06-23 21:25:04']
[14, 2, 1, u'Installed new collection facilities', u'This week we have been installing new rain water harvesting equipment in 10 homes. We are still in the process of doing this, but here is a progress picture.', u'img/2008/06/24/1531738658_e1c104c32e.jpg', u'', u'Rainwater harvesting installation', u'Mark Charmer', u'W', '2008-06-24 23:37:17']
[15, 3, 1, u'blah', u'foo', u'', u'E', u'', u'', u'W', '2008-07-10 22:40:33']
[16, 2, 2, u'Training', u'Performed training session on how to clean the tanks for 10 people today.', u'', u'', u'', u'', u'W', '2008-07-11 10:21:03']
[18, 1, 1, u'Just wanna check this is still working...', u'Aliquam lectus orci, adipiscing et, sodales ac, feugiat non, lacus. Ut dictum velit nec est. Quisque posuere, purus sit amet malesuada blandit, sapien sapien auctor arcu, sed pulvinar felis mi sollicitudin tortor. Maecenas volutpat, nisl et dignissim pharetra, urna lectus ultrices est, vel pretium pede turpis id velit. \r\n\r\nAliquam sagittis magna in felis egestas rutrum. Proin wisi libero, vestibulum eget, pulvinar nec, suscipit ut, mi. Integer in arcu ultricies leo dapibus ultricies. Sed rhoncus lobortis dolor. Suspendisse dolor. Mauris sapien velit, pulvinar non, rutrum non, consectetuer eget, metus. Morbi tincidunt lorem at urna. Etiam porta. Ut mauris. Phasellus tristique rhoncus magna. Nam tincidunt consequat urna. Sed tempor.', u'img/2008/07/16/Bild_53.jpg', u'B', u'Amanda in the park', u'GvH', u'W', '2008-07-16 16:00:07']
[19, 3, 2, u'DEMO Storm destroyed infrastructure', u'DEMO Comment\r\n\r\nThe big storm that hit Osunyai the 24 June 2008 destroyed some of the infrastructure which we have built. We are expecting to start repairing the damage next week.', u'img/2008/07/18/Storm_Damage_2_pb.jpg', u'B', u'Storm damage in the village', u'Thomas', u'W', '2008-07-18 18:55:22']
[20, 7, 7, u'Updates! to Mars! my favorite planet!', u"It's red, very red. Why is it red? I'm not sure.\r\n\r\nRed is Alexander's favorite color.\r\n\r\nBuzz Buzz Buzz Lightyear... to the rescue!", u'img/2008/07/21/Buzz_logosize___.jpg', u'B', u'This photo has a different resolution.', u'beth whiteside', u'W', '2008-07-21 09:31:23']
[21, 7, 7, u'knock knock', u"who's there?\r\nmars.\r\nmars who?\r\n\r\ngods bless you.", u'', u'B', u'', u'', u'W', '2008-07-21 11:04:08']
[22, 36, 4, u'New update', u'Pump installed. Everyone has done a great job.', u'img/2008/07/23/project3.jpg', u'B', u'Working the thing', u'John Malcow', u'W', '2008-07-23 11:36:40']
[23, 7, 4, u'Working as expected', u"Happy days, it's all worked out.\r\n", u'img/2008/07/23/project3_.jpg', u'B', u'At work', u'Luuk', u'W', '2008-07-23 11:45:32']
[24, 7, 4, u'Working as expected', u"Happy days, it's all worked out.\r\n", u'img/2008/07/23/project3__.jpg', u'B', u'At work', u'Luuk', u'W', '2008-07-23 11:45:33']
[25, 3, 6, u'Work in the field', u'Everything is going fine.', u'img/2008/07/24/project3.jpg', u'B', u'Me at work', u'Luuk', u'W', '2008-07-24 11:50:52']
[26, 7, 12, u'mars update', u'blah blah blah will it work?', u'', u'', u'', u'', u'W', '2008-07-30 21:46:25']
]
